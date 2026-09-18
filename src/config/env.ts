import { z } from 'zod';

const envSchema = z.object({
  THIRD_PARTY_API_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Missing or invalid environment variables:', _env.error.format());
  process.exit(1);
}

export const env = _env.data;