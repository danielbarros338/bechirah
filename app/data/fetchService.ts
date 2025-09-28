export default async function fetchService(
  method: string,
  endpoint: string,
  body: BodyInit | null,
  headers: HeadersInit = {}
): Promise<any> {
  const config = useRuntimeConfig();
  const webhookBaseUrl = config.public.webhookBaseUrl || 'http://localhost:5678/webhook';

  const finalHeaders = new Headers(headers);

  if (method.toUpperCase() === 'DELETE' && (body === null || body === undefined)) {
    finalHeaders.delete('Content-Type');
  }

  if (!finalHeaders.has('Accept')) finalHeaders.set('Accept', 'application/json');

  const response = await fetch(`${webhookBaseUrl}/${endpoint}`, {
    method,
    headers: finalHeaders,
    body: body ?? undefined,
    mode: 'cors',
    credentials: 'omit',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) return null;

  return await response.json();
}
