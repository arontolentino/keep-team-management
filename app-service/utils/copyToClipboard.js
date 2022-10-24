export default function copyToClipboard(string) {
  return navigator.clipboard.writeText(string);
}
