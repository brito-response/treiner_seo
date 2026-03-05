import { NewsCardComplete } from '@/components/NewsCardComplete';
import { PaginatedPosts, PostQuery } from '@/utils/models/postsquery';

async function getFilteredPosts(categoryName: string): Promise<PaginatedPosts | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/filtered?categoryName=${categoryName}`);
    if (!response.ok) return null;
    const paginatedPosts: PaginatedPosts = await response.json();
    return paginatedPosts;
  } catch (err) {
    return null;
  }
};

export default async function PageEsportes() {
  const paginated = await getFilteredPosts("Esportes")

  return (
    <main className="container mx-auto px-4 py-8 space-y-10 mt-20">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Esportes</h2>

        {paginated === null ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <p className="text-gray-500 text-lg text-center">
              Não foi possível carregar posts dessa categoria.
            </p>
            <img
              src="/empty-state.svg"
              alt="Nenhum post"
              className="w-48 h-48 object-contain"
            />
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.data?.map((item: PostQuery) => (
              <NewsCardComplete key={item.postId} news={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};