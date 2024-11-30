export function speak(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  } else {
    console.error('Text-to-speech not supported in this browser.')
  }
}

