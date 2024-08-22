import { z } from 'zod';

export const initOptionsSchema = z.object({
  cwd: z.string().optional()
});

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';
