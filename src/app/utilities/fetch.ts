export async function getDataFromJSON<T>(jsonUrl: string): Promise<T> {
  return fetch(jsonUrl).then(res => res.json())
}
