export function setCookie(name: string, value: string, expiredDate: Date) {
  document.cookie = `${name}=${value};expires=${expiredDate.toUTCString()};path=/`;
}
