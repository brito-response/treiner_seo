"use client";

import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Category } from "@/utils/models/categories";
import { formSchema, FormSchemaType } from "./form-scheme";
import { InputCustom } from "@/components/Inputs/InputCustom";
import { InputRichTextEditor } from "@/components/Inputs/InputRichTextEditor";

type FormEditCategoryProps = { category: Category; };
export const FormEditCategory: React.FC<FormEditCategoryProps> = ({ category }) => {
  const router = useRouter();
  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema), mode: "onChange",
    defaultValues: { name: category.name, slug: category.slug, description: category.description },
  });

  const { handleSubmit, watch, formState: { isSubmitting } } = methods;
  const onSubmit = async (data: FormSchemaType) => {
    const payload = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/category/${category.categoryId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) { toast.error("Erro ao atualizar o category"); return; };

      toast.success("Category atualizado com sucesso!");
      router.push("/manager")
    } catch {
      toast.error("Erro ao comunicar com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">

        <InputCustom name="name" label="name do Category" />
        <InputCustom name="slug" label="slug do Category" />

        <InputRichTextEditor name="content" label="Conteúdo" placeholder="Atualize o conteúdo do Category..." />

        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"> Salvar
        </button>
      </form>
    </FormProvider>
  );
};

