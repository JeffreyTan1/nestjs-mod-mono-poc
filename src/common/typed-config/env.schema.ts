import { z } from 'zod';

const truthy = 'true';
const falsy = 'false';

const parseBoolean = (val: string): boolean => {
  const normalized = val.toLowerCase();
  return normalized === truthy;
};

export const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.string().transform((val) => Number(val)),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),

  IS_LOCAL: z.string().transform(parseBoolean).optional().default(falsy),
});

export type Env = z.infer<typeof envSchema>;
