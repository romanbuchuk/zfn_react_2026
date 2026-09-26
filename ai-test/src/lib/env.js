import { z } from 'zod';

const environmentSchema = z.object({
  VITE_API_BASE_URL: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.string().url().optional(),
  ),
});

const result = environmentSchema.safeParse(import.meta.env);

if (!result.success) {
  throw new Error(
    `Invalid application environment:\n${z.prettifyError(result.error)}`,
  );
}

export const env = {
  apiBaseUrl: result.data.VITE_API_BASE_URL,
};
