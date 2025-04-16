import { z } from 'zod';

/**
 * Parses a string into an enum value using Zod.
 * Throws an error if the string cannot be parsed into a valid enum value.
 *
 * @param enumObj - The enum object to parse into
 * @param value - The string value to parse
 * @returns The parsed enum value
 * @throws Error if the string cannot be parsed into a valid enum value
 */
export function parseEnumStrict<T extends Record<string, string | number>>(
  enumObj: T,
  value: string,
): T[keyof T] {
  // Create a Zod enum schema from the enum object
  const enumSchema = z.enum(Object.values(enumObj) as [string, ...string[]]);

  try {
    // Parse the value using the schema
    const parsedValue = enumSchema.parse(value);

    // Find the corresponding enum key
    const enumKey = Object.entries(enumObj).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, v]) => v === parsedValue,
    )?.[0];

    if (!enumKey) {
      throw new Error(`Invalid enum value: ${value}`);
    }

    return enumObj[enumKey as keyof T];
  } catch (error) {
    throw new Error(
      `Failed to parse enum value: ${value}. ${error instanceof Error ? error.message : 'Unknown error'}`,
    );
  }
}
