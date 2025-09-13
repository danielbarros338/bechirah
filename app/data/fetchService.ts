export default async function fetchService(
  method: string,
  endpoint: string,
  body: BodyInit | null,
  headers: HeadersInit
): Promise<any> {
  const response = await fetch(
    'http://localhost:5678/webhook/' + endpoint,
    {
      method,
      headers,
      body
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}
