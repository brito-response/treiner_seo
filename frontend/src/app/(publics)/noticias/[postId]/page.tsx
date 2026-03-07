import Image from "next/image";
import BackButton from "@/components/BackButton";
import { PostHilight } from "@/utils/models/posthilight";
import { User2Icon } from "lucide-react";
import { UpdateHilightButton } from "@/components/UpdateHilightButton";

async function getPostById(postId: string): Promise<PostHilight | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${postId}/relationships`, { method: "GET", cache: "no-store" });
    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return null;
  }
}

interface PageProps { params: Promise<{ postId: string }>; };

export default async function PageNoticia({ params }: PageProps) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) {
    return (
      <main className="max-w-4xl mx-auto mt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Post não encontrado</h1>
        <BackButton />
      </main>
    );
  }

  return (
    <main className="w-full h-full flex justify-center items-center py-4">
      <div className="min-h-screen w-[90%] bg-[#efe6d2] pt-28 pb-20 text-gray-900 rounded-sm">
        <section className="max-w-5xl mx-auto px-6">
          {post.categories?.length > 0 && (
            <div className="text-center mb-6">
              <span className="uppercase tracking-widest text-sm font-semibold border-b border-gray-800 pb-1">
                {post.categories[0].name}
              </span>
            </div>
          )}

          {/* TITULO */}
          <h1 className="text-5xl md:text-6xl font-black text-center leading-tight font-serif mb-6">
            {post.title}
          </h1>

          {/* META */}
          <div className="flex items-center justify-center gap-3 text-sm mb-10">

            {post.user.photo ? (
              <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.user.photo}`} alt={post.user.name} width={32} height={32} unoptimized className="rounded-full object-cover" />
            ) : (
              <User2Icon size={18} />
            )}

            <span className="font-medium">{post.user.name}</span>
            <span>—</span>

            <span>
              {new Date(post.publishedAt ?? post.user.createdAt).toLocaleDateString("pt-BR")}
            </span>

          </div>

          {/* CONTEUDO EM COLUNAS */}
          <article className="text-lg leading-8 font-serif columns-1 md:columns-2 gap-12">

            {post.image && (
              <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${post.image}`} alt={post.title} width={420} height={260} unoptimized className="mb-4" />
            )}

            <p className="text-xl first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {post.content}
            </p>

          </article>

          {/* TAGS */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-700">
              {post.tags.map((tag) => (
                <span key={tag.tagId} className="text-xs bg-[#e0d7c3] px-3 py-1">
                  #{tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="w-full flex justify-between">
            <BackButton />
            <UpdateHilightButton postId={postId} />
          </div>

        </section>

      </div>
    </main>

  );
}