export class ApiRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export async function requestText(input: RequestInfo, init?: RequestInit): Promise<string> {
  const res = await fetch(input, init);
  const text = await res.text();

  if (!res.ok) {
    throw new ApiRequestError(res.status, text.trim() || res.statusText);
  }

  return text;
}

export async function requestJson<TResponse>(input: RequestInfo, init?: RequestInit): Promise<TResponse> {
  const text = await requestText(input, init);
  return JSON.parse(text) as TResponse;
}
