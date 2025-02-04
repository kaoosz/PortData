export function requiredMessage(field: unknown): string {
  return `O campo ${field} é requerido`;
}

export function invalidTypeMessage(field: unknown, type: string): string {
  return `O campo ${field} é do tipo ${type}.`;
}
