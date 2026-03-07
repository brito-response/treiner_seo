import { FormEditPost } from "@/forms/posts";
import { Post } from "@/utils/models/posts";
interface PageProps { params: { postId: string; }; };

async function getPostById(postId: string): Promise<Post | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${postId}`, { method: "GET", cache: "no-store" });
    if (!response.ok) { return null; };
    const post: Post = await response.json();
    return post;
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return null;
  }
};

export default async function PostEditPage({ params }: PageProps) {
  const { postId } = params;
  const post: Post | null = await getPostById(postId);

  return (
    <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">

        {post ? (
          <>
            {/* Informações do post */}
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
              <h1 className="text-2xl font-semibold">Editar Post</h1>
              <p className="text-sm opacity-70 mt-1">
                Este Post foi • Criado em
              </p>
            </section>

            {/* Formulário */}
            <FormEditPost post={post} />
          </>
        ) : (
          <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
            <h1 className="text-xl font-semibold">
              Post não encontrado
            </h1>
            <p className="text-sm opacity-70 mt-2">
              O Post que você está tentando editar não existe ou foi removido.
            </p>
          </section>
        )}

      </div>
    </div>
  );
};

