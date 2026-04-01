import type { AuthResponseDto } from '@/lib/types/auth';
import type { LoginInput, RegisterInput } from '@/lib/validations';

export class AuthRequestError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = 'AuthRequestError';
  }
}

async function parseAuthResponse(res: Response): Promise<AuthResponseDto> {
  const text = await res.text();
  if (!res.ok) {
    throw new AuthRequestError(res.status, text.trim() || res.statusText);
  }
  return JSON.parse(text) as AuthResponseDto;
}

export async function loginWithCredentials(input: LoginInput): Promise<AuthResponseDto> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
  return await parseAuthResponse(res);
}

export async function registerAccount(input: RegisterInput): Promise<AuthResponseDto> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      fullName: input.fullName,
      email: input.email,
      password: input.password,
      role: input.role,
    }),
  });
  return await parseAuthResponse(res);
}
