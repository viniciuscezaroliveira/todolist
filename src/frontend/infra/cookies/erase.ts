export function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=0";
}
