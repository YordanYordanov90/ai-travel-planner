import { z } from 'zod';

export const formSchema = z.object({
    startDate: z.date(),
    endDate: z.date(),
    budget: z.number().min(0),
    activity: z.array(z.string().min(1)),
    destination: z.string().optional(),
  });