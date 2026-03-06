"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Partnership } from "@/utils/models/partnerships";
import { formSchema, FormSchemaType } from "./form-scheme";
import { InputCustom } from "@/components/Inputs/InputCustom";
import { InputRichTextEditor } from "@/components/Inputs/InputRichTextEditor";
import { delay } from "@/utils/utils";

type FormEditPartnershipProps = { partnership: Partnership; };
export const FormEditPartnership: React.FC<FormEditPartnershipProps> = ({ partnership }) => {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(partnership.image ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${partnership.image}` : null);
  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema), mode: "onChange",
    defaultValues: { title: partnership.title, content: partnership.content, status: partnership.status },
  });

  const { handleSubmit, watch, formState: { isSubmitting } } = methods;
  const titlePreview = watch("title");
  const onSubmit = async (data: FormSchemaType) => {
    const payload = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));
    if (Object.keys(payload).length === 0 && !photoFile) {
      toast.info("Nenhuma alteração para salvar");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/partnership/${partnership.partnershipId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) { toast.error("Erro ao atualizar o partnership"); return; };

      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile, photoFile.name);
        await delay(3000);
        const uploadResp = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/images/partnership/${partnership.partnershipId}`, { method: "POST", body: formData });
        if (!uploadResp.ok) {
          toast.warning("os dados do partnership foram salvos, mas a imagem não foi possivel carregar e atualizar, tente novamente...");
          router.refresh();
          return;
        }
      }

      toast.success("Partnership atualizado com sucesso!");
      router.push("/manager")
    } catch {
      toast.error("Erro ao comunicar com o servidor");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (photoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoFile(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (photoPreview?.startsWith("blob:")) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">
          {titlePreview || "Prévia do título do Partnership"}
        </h1>
        <InputCustom name="title" label="Título do Partnership" />
        {photoPreview && (<img src={photoPreview} className="h-64 w-full object-cover rounded-lg" alt="Prévia" />)}

        <input type="file" accept="image/*" onChange={handleFileChange} />
        <InputRichTextEditor name="content" label="Conteúdo" placeholder="Atualize o conteúdo do Partnership..." />

        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50"> Salvar
        </button>
      </form>
    </FormProvider>
  );
};

