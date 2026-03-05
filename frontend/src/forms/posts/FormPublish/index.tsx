"use client";

import { toast } from "react-toastify";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { Post, PostStatus } from "@/utils/models/posts";
import { formSchema, FormSchemaType } from "./form-scheme";
import Image from "next/image";

type FormPublishProps = { post: Post; };
export const FormPublish: React.FC<FormPublishProps> = ({ post }) => {
  const router = useRouter();
  const methods = useForm<FormSchemaType>({ resolver: yupResolver(formSchema), mode: "onChange", defaultValues: { status: post.status } });
  const { handleSubmit, register, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: FormSchemaType) => {
    const payload = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined));

    if (Object.keys(payload).length === 0) {
      toast.info("Nenhuma alteração para salvar");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/posts/${post.postId}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Erro ao atualizar o post");
        return;
      }
      toast.success("atualizado...");
      router.push("/manager");
    } catch {
      toast.error("Erro ao comunicar com o servidor");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
        <h1 className="text-3xl font-bold">{post.title || "Prévia do título do Post"}</h1>

        <p>{post.content}</p>
        <div className="relative w-full h-64">
          <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`} alt="Imagem do post" fill className="object-cover rounded-lg" unoptimized />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Status</label>

          <select {...register("status")} className="border rounded-md px-3 py-2">
            {Object.values(PostStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={isSubmitting} className="bg-blue-700 text-white px-6 py-2 rounded-md disabled:opacity-50">Salvar</button>
      </form>
    </FormProvider>
  );
};
