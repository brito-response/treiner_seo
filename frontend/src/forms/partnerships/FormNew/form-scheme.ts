import * as yup from 'yup';

export const formSchema = yup.object({
  businessName: yup.string().required('Nome do negócio é obrigatório'),
  whatsapp: yup.string().required('Whatsapp é obrigatório'),
  website: yup.string().required('Whatsapp é obrigatório'),
  address: yup.string().required('Endereço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
});

export type FormSchemaType = yup.InferType<typeof formSchema>;
