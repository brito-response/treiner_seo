"use client";

import { useForm, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema, FormSchemaType } from './form-scheme';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { delay } from '@/utils/utils';
import { InputCustom } from '@/components/Inputs/InputCustom';
import { InputRichTextEditor } from '@/components/Inputs/InputRichTextEditor';

export const FormNewCategory = () => {
  const router = useRouter();
  const methods = useForm<FormSchemaType>({ resolver: yupResolver(formSchema), mode: 'onChange', defaultValues: { name: '', slug: '', description: '' } });
  const { handleSubmit, formState: { isValid, isSubmitting } } = methods;

  const onSubmit = async (data: FormSchemaType) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 201) {
        toast.success("")
      } else {
        toast.error("Erro ao criar o recurso.");
      }
    } catch (err) {
      toast.error("Error communicating with the server.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-6">
        <InputCustom name="name" label="Name da Categoria" required />
        <InputCustom name="slug" label="Slug da Categoria" required />
        <InputRichTextEditor name="description" label="Descrição" placeholder="Escreva seu post..." />

        <div className="sticky bottom-0 border-t pt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Tem certeza que quer criar essa categoria?
          </span>

          <div className="flex gap-3">
            <button type="button" className="text-sm px-4 py-2 rounded-md hover:bg-gray-100">
              Cancelar
            </button>
            <button type="submit" disabled={!isValid || isSubmitting} className="px-6 py-2 bg-blue-700 text-white disabled:bg-gray-600 rounded-md hover:bg-blue-400">
              Criar
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

