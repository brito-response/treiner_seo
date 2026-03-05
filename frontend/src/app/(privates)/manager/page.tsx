import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HeroInfo } from "@/components/HeroInfo";
import { PostStatus } from "@/utils/models/posts";
import { PaginatedPosts, PostQuery } from "@/utils/models/postsquery";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

// async function getFilteredPosts(categoryName: string, page: string = "1", limit: string = "10"): Promise<PaginatedPosts | null> {
async function getFilteredPosts(status: string): Promise<PaginatedPosts | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/filtered?status=${status}`, { next: { revalidate: 360 } });
    if (!response.ok) return null;
    const paginatedPosts: PaginatedPosts = await response.json();
    return paginatedPosts;
  } catch (err) {
    return null;
  }
};

export default async function Manager() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");
  const objectPosts = await getFilteredPosts(PostStatus.DRAFT);
  const { data = [], count = 0 } = objectPosts ?? {};

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-800">
      <HeroInfo />

      {/* SEARCH */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <input type="text" placeholder="Buscar artigos..." className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="flex justify-between items-center mb-12">
          <h3 className="text-2xl font-semibold">
            Seus rascunhos
          </h3>
          <Link href={"/posts/new"} className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition">
            Novo Rascunho
          </Link>
        </div>

        <div className="space-y-6">
          {data.length === 0 ? (
            <div className="w-full flex-col items-center justify-center text-center py-20 text-gray-500">
              <p className="text-lg">Você ainda não tem rascunhos</p>
              <p className="text-lg">Até hoje: {new Date().toLocaleDateString("pt-BR")}</p>
            </div>
          ) : (
            data.map((post: PostQuery) => (
              <div key={post.postId} className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition">
                <div>
                  <h4 className="font-semibold text-lg">{post.title}</h4>
                  <p className="text-sm text-gray-500">Última edição há 2 dias • Não publicado</p>
                </div>

                <div className="flex gap-4">
                  <Link href={""} className="text-blue-600 text-sm font-medium">Editar </Link >
                  <Link href={""} className="text-gray-400 text-sm">Excluir</Link >
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
