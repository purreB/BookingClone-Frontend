import { useMutation, type UseMutationResult } from "@tanstack/react-query";

import { loginWithCredentials, registerAccount } from "@/lib/api/auth-client";
import type { AuthResponseDto } from "@/lib/types/auth";
import type { LoginInput, RegisterInput } from "@/lib/validations";

export function useLoginMutation(): UseMutationResult<AuthResponseDto, Error, LoginInput> {
  return useMutation({
    mutationFn: loginWithCredentials,
  });
}

export function useRegisterMutation(): UseMutationResult<AuthResponseDto, Error, RegisterInput> {
  return useMutation({
    mutationFn: registerAccount,
  });
}
