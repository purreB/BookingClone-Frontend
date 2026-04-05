/** Case-insensitive: Staff and Owner may create/manage hotels (UI gate only). */
export function canManageHotels(roles: string[] | null | undefined): boolean {
  return roles?.some((r) => /^(Staff|Owner)$/i.test(r)) ?? false;
}
