"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-12">
      <button
        onClick={() => router.back()}
        className="
          bg-red-600
          text-white
          font-semibold
          px-6
          py-3
          rounded-lg
          shadow-md
          hover:bg-red-700
          hover:-translate-y-1
          transition-all
          duration-300
        "
      >
        Voltar
      </button>
    </div>
  );
}