import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormEditCategory } from "@/forms/categories";
import { Category } from "@/utils/models/categories";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface PageProps { params: { categoryId: string; }; };

async function getCategoryById(categoryId: string, token: string): Promise<Category | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/categories/${categoryId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) { return null; };
    const category: Category = await response.json();
    return category;
  } catch (error) {
    console.error("Erro ao buscar category:", error);
    return null;
  }
};

export default async function CategoryEditPage({ params }: PageProps) {
  const { categoryId } = await params;
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");
  const category: Category | null = await getCategoryById(categoryId, session.accessToken);
  return (
    <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        {category ? (
          <>
            {/* Informações do post */}
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
              <h1 className="text-2xl font-semibold">Editar Category</h1>
              <p className="text-sm opacity-70 mt-1">
                Este Category foi • Criado em
              </p>
            </section>

            {/* Formulário */}
            <FormEditCategory category={category} />
          </>
        ) : (
          <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
            <h1 className="text-xl font-semibold">
              Post não encontrado
            </h1>
            <p className="text-sm opacity-70 mt-2">
              O Category que você está tentando editar não existe ou foi removido.
            </p>
          </section>
        )}

      </div>
    </div>
  );
};

