export function decodeJsonSelection(source: string): string {
  const trimmed = source.trim();
  const wrappedInSingleQuotes =
    trimmed.length > 1 && trimmed.charAt(0) === "'" &&
    trimmed.charAt(trimmed.length - 1) === "'";
  const input = wrappedInSingleQuotes ? trimmed.slice(1, -1) : trimmed;

  let value = JSON.parse(input);
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch (error) {
      // A regular JSON string is already fully decoded.
    }
  }
  return JSON.stringify(value);
}

export function encodeJsonSelection(source: string): string {
  let value;
  try {
    value = JSON.parse(source);
  } catch (error) {
    value = source;
  }
  return JSON.stringify(JSON.stringify(value));
}
