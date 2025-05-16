import { z } from "zod";

export const FormSchema = z.object({
  startDate: z.string().min(1, "Data inicial é obrigatória"),
  endDate: z.string().min(1, "Data final é obrigatória"),
  polygon: z
    .array(z.tuple([z.number(), z.number()]))
    .min(3, "É necessário ao menos 3 pontos para formar um polígono"),
});

export type FormData = z.infer<typeof FormSchema>;
