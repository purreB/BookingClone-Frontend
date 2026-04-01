export type AuthResponseDto = {
  accessToken: string | null;
  expiresAtUtc: string;
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: string[] | null;
};

export type AuthSession = {
  accessToken: string | null;
  expiresAtUtc: string;
  userId: string;
  email: string | null;
  fullName: string | null;
  roles: string[] | null;
};

export function authResponseToSession(dto: AuthResponseDto): AuthSession {
  return {
    accessToken: dto.accessToken,
    expiresAtUtc: dto.expiresAtUtc,
    userId: dto.userId,
    email: dto.email,
    fullName: dto.fullName,
    roles: dto.roles,
  };
}
