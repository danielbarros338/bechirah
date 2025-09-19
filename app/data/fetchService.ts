export default async function fetchService(
  method: string,
  endpoint: string,
  body: BodyInit | null,
  headers: HeadersInit
): Promise<any> {
  const config = useRuntimeConfig();
  const webhookBaseUrl = config.public.webhookBaseUrl || 'http://localhost:5678/webhook';
  
  const response = await fetch(
    `${webhookBaseUrl}/${endpoint}`,
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
