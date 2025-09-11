import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().regex(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, { message: 'Email com formato inválido' }),
  password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
});

export type ILoginSchema = z.infer<typeof loginSchema>;
