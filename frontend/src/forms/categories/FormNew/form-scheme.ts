import * as yup from 'yup';

export const formSchema = yup.object({
  name: yup.string().required('Título é obrigatório'),
  slug: yup.string().required('Título é obrigatório'),
  description: yup.string().required('Conteúdo é obrigatório'),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
