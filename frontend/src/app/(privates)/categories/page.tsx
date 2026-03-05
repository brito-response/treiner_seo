import { Category } from "@/utils/models/categories";
import Link from "next/link";
import { FileCogIcon, FileText } from "lucide-react";
import { HeaderAtalho } from "@/components/HeaderAtalho";

async function getcategories(): Promise<Category[]> {
  const response = await fetch(`${process.env.NEXT_BACKEND_URL}/categories`, {
    cache: "no-store",
  });
  if (!response.ok) return [];
  const categories: Category[] = await response.json();
  return categories;
}

export default async function CategoriesPage() {
  const categories: Category[] = await getcategories();

  return (
    <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
      <HeaderAtalho atalhos={[{ content: "Nova Categoria", url: "/categories/new" }, { content: "Posts", url: "/posts" }]} />
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold">Categories</h1>
              <p className="text-muted-foreground">
                Lista de categories publicados na aplicação
              </p>
            </div>
          </div>
        </header>

        {/* Categories list */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category: Category) => (
            <article key={category.categoryId} className="rounded-2xl bg-background p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 w-full bg-muted text-muted-foreground ">
                  <h2 className="font-semibold text-lg leading-snug">
                    {category.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <FileText className="w-5 h-5" />
                    <Link href={`/categories/${category.categoryId}/config`} className="cursor-pointer p-2 hover:bg-amber-400 rounded-2xl">
                      <FileCogIcon className="w-5 h-5" />
                    </Link>
                  </div>

                </div>
              </div>
              <div className="flex items-center justify-around">
                <Link href={`/categories/${category.categoryId}/edit`} >editar</Link>
                <Link href={`/categories/${category.categoryId}/delete`} >excluir</Link>
              </div>

            </article>
          ))}
        </section>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="mt-20 text-center text-muted-foreground">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>Nenhum category encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};
