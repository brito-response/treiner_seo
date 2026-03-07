"use client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type UpdateHilightButton = {
  postId: string;
};
export const UpdateHilightButton: React.FC<UpdateHilightButton> = ({ postId }) => {
  const router = useRouter();

  const handleincrement = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${postId}/highlight`, { method: "PATCH" });
      if (!res.ok) { toast.error("Erro ao atualizar destaque"); return; };
      router.back();
    } catch (error) {
      router.refresh();
    }
  }

  return (
    <div className="flex justify-center mt-12">
      <button className="bg-green-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-green-700 hover:-translate-y-1 transition-all duration-300 "
        onClick={handleincrement}>
        Incrementar
      </button>
    </div>
  );
}