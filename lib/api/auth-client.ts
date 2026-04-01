import type { AuthResponseDto } from '@/lib/types/auth';
import type { LoginInput, RegisterInput } from '@/lib/validations';
import { ApiRequestError, requestJson } from '@/lib/api/client';

export class AuthRequestError extends ApiRequestError {}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof AuthRequestError) return error.message;
  if (error instanceof Error) return error.message;
  return 'Something went wrong.';
}

export async function loginWithCredentials(input: LoginInput): Promise<AuthResponseDto> {
  try {
    return await requestJson<AuthResponseDto>('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw new AuthRequestError(error.status, error.message);
    }
    throw error;
  }
}

export async function registerAccount(input: RegisterInput): Promise<AuthResponseDto> {
  try {
    return await requestJson<AuthResponseDto>('/api/auth/register', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        fullName: input.fullName,
        email: input.email,
        password: input.password,
        role: input.role,
      }),
    });
  } catch (error) {
    if (error instanceof ApiRequestError) {
      throw new AuthRequestError(error.status, error.message);
    }
    throw error;
  }
}
