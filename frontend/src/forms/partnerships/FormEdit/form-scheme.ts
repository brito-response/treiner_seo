import * as yup from "yup";
import { PartnershipStatus } from "@/utils/models/partnership";
// Partnerships se tiver campo "imagem" lembrar nao incluir, uploadde imagem pesada deve ser feita separadamente

export const formSchema = yup.object({
  title: yup.string().transform((value) => (value === "" ? undefined : value)).min(3, "O título deve ter pelo menos 3 caracteres").max(150, "O título deve ter no máximo 150 caracteres").nullable().defined(),
  content: yup.string().transform((value) => (value === "" ? undefined : value)).min(10, "O conteúdo deve ter pelo menos 10 caracteres").nullable().defined(),
  status: yup.mixed<PartnershipStatus>().oneOf(Object.values(PartnershipStatus)).nullable().defined(),
});

export type FormSchemaType = yup.Asserts<typeof formSchema>;
