export function queryToObject(query: string): { [key: string]: string } {
  const obj: { [key: string]: any } = {};
  const queryString = new URLSearchParams(query);
  queryString.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}
