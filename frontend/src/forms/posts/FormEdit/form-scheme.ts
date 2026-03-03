import * as yup from "yup";
import { PostStatus } from "@/utils/models/posts";


export const formSchema = yup.object({
  title: yup.string().transform((value) => (value === "" ? undefined : value)).min(3, "O título deve ter pelo menos 3 caracteres").max(150, "O título deve ter no máximo 150 caracteres").nullable().defined(),
  content: yup.string().transform((value) => (value === "" ? undefined : value)).min(10, "O conteúdo deve ter pelo menos 10 caracteres").nullable().defined(),
  status: yup.mixed<PostStatus>().oneOf(Object.values(PostStatus)).nullable().defined(),
});

export type FormSchemaType = yup.Asserts<typeof formSchema>;
