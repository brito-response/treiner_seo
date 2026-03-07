"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-12">
      <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-red-700 hover:-translate-y-1 transition-all duration-300 "
        onClick={() => router.back()}>
        Voltar
      </button>
    </div>
  );
}