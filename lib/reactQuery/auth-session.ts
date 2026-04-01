import { useQuery, useQueryClient, type UseQueryResult } from '@tanstack/react-query';

import { authKeys } from '@/lib/queryKeys';
import type { AuthSession } from '@/lib/types/auth';

async function noOpSessionQueryFn(): Promise<AuthSession | null> {
  return null;
}

export function useAuthSession(): UseQueryResult<AuthSession | null> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authKeys.session(),
    queryFn: noOpSessionQueryFn,
    enabled: false,
    initialData: () => queryClient.getQueryData<AuthSession | null>(authKeys.session()) ?? null,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: Number.POSITIVE_INFINITY,
  });
}
