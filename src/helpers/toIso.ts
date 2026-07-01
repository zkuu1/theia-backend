export function toISOString(
    value: Date | string | null | undefined
): string {
    if (!value) return "";

    if (value instanceof Date) {
        return value.toISOString();
    }

    return value;
}