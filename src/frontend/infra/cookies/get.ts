export function getCookie(name: string) {
  const cookies = document.cookie.split(";");
  const cookieToken = cookies
    .find((cookie) => {
      return cookie.includes(`${name}=`);
    })
    ?.split("=");
  if (cookieToken?.length) {
    return cookieToken[1];
  }
  return null;
}
