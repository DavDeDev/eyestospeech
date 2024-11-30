export function speak(text: string) {
  window.speechSynthesis.cancel();
  if ('speechSynthesis' in window) {
    console.log('Speaking:', text)
    const utterance = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utterance)
  } else {
    console.error('Text-to-speech not supported in this browser.')
  }
}

