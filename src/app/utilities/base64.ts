export function b64EncodeUnicode(text: string) {
  return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode(parseInt(p1, 16));
  }));
}
