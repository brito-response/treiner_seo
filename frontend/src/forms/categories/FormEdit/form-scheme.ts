import * as yup from "yup";
// Categories se tiver campo "imagem" lembrar nao incluir, uploadde imagem pesada deve ser feita separadamente

export const formSchema = yup.object({
  name: yup.string().transform((value) => (value === "" ? undefined : value)).min(3, "O name deve ter pelo menos 3 caracteres").max(150, "O título deve ter no máximo 150 caracteres").nullable().defined(),
  slug: yup.string().transform((value) => (value === "" ? undefined : value)).min(5, "O slug deve ter pelo menos 10 caracteres").nullable().defined(),
  description: yup.string().transform((value) => (value === "" ? undefined : value)).min(10, "O conteúdo deve ter pelo menos 10 caracteres").nullable().defined(),
});

export type FormSchemaType = yup.Asserts<typeof formSchema>;
