export function show(text: string) {
  const blob = new Blob([text], { type: 'application/pdf' });
  window.open(URL.createObjectURL(blob));
}
