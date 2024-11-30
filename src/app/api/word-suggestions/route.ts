import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { sentence } = await req.json();
    console.log("[api]sentence,", sentence)
    // if the sentence is empty, just provide the default words to start a sentence for a patient affected by aphasia
    if (!sentence) {
      return new Response(JSON.stringify(['can', 'what', 'why', 'how']), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = `I am a ive me the best 4 options to continue the sentence: ${sentence}`;

    const result = await generateObject({
      model: openai('gpt-4o-2024-08-06'),
      schema: z.object({
        words: z.array(z.string()).min(4, "Must provide at least 4 words")
      }),
      prompt: prompt,
    });

    // If the result doesn't have the expected structure, return a fallback
    if (!result.object?.words) {
      return new Response(JSON.stringify(['and', 'the', 'to', 'of']), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // if the object is longer than four or contains dublicate words, just return the first four
    if (result.object.words.length > 4 || new Set(result.object.words).size !== result.object.words.length) {
      result.object.words = result.object.words.slice(0, 4);
    }

    return new Response(JSON.stringify(result.object.words), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Word suggestion error:', error);

    return new Response(JSON.stringify({
      error: 'Failed to generate word suggestions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}