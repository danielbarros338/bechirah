import * as z from 'zod';

export const vacancySchema = z.object({
  profession: z.string().min(3, { message: 'A profissão deve ter no mínimo 3 caracteres' }),
  experienceTime: z.number().min(0, { message: 'O tempo de experiência deve ser um número positivo' }),
  type: z.string().min(3, { message: 'O tipo deve ter no mínimo 3 caracteres' }),
  location: z.string().nullable(),
  cutRanking: z.number().min(0).max(10, { message: 'A nota de corte deve estar entre 0 e 10' }),
  emailTitle: z.string().min(3, { message: 'O título do email deve ter no mínimo 3 caracteres' }),
  description: z.string().min(10, { message: 'A descrição deve ter no mínimo 10 caracteres' }),
});

export type IVacancySchema = z.infer<typeof vacancySchema>;