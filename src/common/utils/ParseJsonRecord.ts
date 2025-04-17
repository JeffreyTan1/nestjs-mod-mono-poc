import { Transform } from 'class-transformer';
import { z } from 'zod';
import { BadRequestException } from '@nestjs/common';

const JsonToRecordSchema = z.record(z.string(), z.string());

export function ZodParseJsonRecord(): PropertyDecorator {
  return Transform(({ value, key }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const parsedJson: unknown = JSON.parse(value);
      const parsedRecord = JsonToRecordSchema.safeParse(parsedJson);

      if (!parsedRecord.success) {
        throw new BadRequestException(
          `Invalid metadata format for field '${key}'`,
        );
      }

      return parsedRecord.data;
    } catch (error: unknown) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Handle JSON parsing errors or other unexpected errors
      const errorMessage =
        error instanceof Error ? error.message : 'Could not parse JSON record';
      throw new BadRequestException(
        `Invalid metadata for field '${key}': ${errorMessage}`,
      );
    }
  });
}
