"use client";

import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema, FormSchemaType } from "./form-scheme";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { InputCustom } from "@/components/Inputs/InputCustom";
import { delay } from "@/utils/utils";

export const FormNewPartnership = () => {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const methods = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema), mode: "onChange", defaultValues: { businessName: "", whatsapp: "", website: "", address: "", description: "" },
  });

  const { handleSubmit, formState: { isValid, isSubmitting } } = methods;

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/partnerships`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const partnership = await response.json();

      if (response.status === 201 && partnership.partnershipId && logoFile) {
        const formData = new FormData();
        formData.append("photo", logoFile, logoFile.name);
        toast.success("encaminhando imagem ...");
        await delay(3000);
        const uploadResp = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/images/partnerships/${partnership.partnershipId}`, { method: "POST", body: formData });
        if (uploadResp.ok) {
          toast.success("Parceiro criado com sucesso!");
          router.refresh();
          router.push("/partnerships");
        } else {
          toast.error("Erro ao enviar logo.");
        }
      } else if (response.status === 201) {
        toast.success("Parceiro criado com sucesso!");
        router.push("/manager/partnerships");
      } else {
        toast.error("Erro ao criar parceria.");
      }
    } catch (err) {
      toast.error("Erro ao comunicar com o servidor.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setLogoFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    } else {
      setLogoPreview(null);
    }
  };

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-6 py-6 flex flex-col gap-6">
        <InputCustom name="businessName" label="Nome do negócio" required />
        <InputCustom name="whatsapp" label="Whatsapp" required />
        <InputCustom name="website" label="Website" />
        <InputCustom name="address" label="Endereço" required />
        <InputCustom name="description" label="Descrição" required />

        {/* LOGO PREVIEW */}
        {logoPreview && (
          <div className="w-full h-48 rounded-lg overflow-hidden border">
            <img src={logoPreview} alt="Preview da logo" className="w-full h-full object-contain" />
          </div>
        )}

        {/* LOGO UPLOAD */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Logo da empresa
          </label>

          <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2 border border-dashed rounded-lg p-2 w-full" />

          {logoFile && (
            <p className="text-sm text-green-600 mt-1">{logoFile.name}</p>
          )}
        </div>
        <button type="submit" disabled={!isValid || isSubmitting} className="px-6 py-2 bg-blue-700 text-white disabled:bg-gray-400 rounded-md hover:bg-blue-600">
          Criar parceria
        </button>
      </form>
    </FormProvider>
  );
};