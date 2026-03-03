import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { HeroInfo } from "@/components/HeroInfo";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Manager() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-800">

      {/* HERO */}
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
            Novo Post
          </Link>
        </div>

        <div className="space-y-6">

          {[1, 2, 3].map((post) => (
            <div key={post} className="bg-white border border-gray-100 rounded-2xl p-6 flex justify-between items-center hover:shadow-md transition">
              <div>
                <h4 className="font-semibold text-lg">Como escalar freelas em 2026</h4>
                <p className="text-sm text-gray-500">
                  Última edição há 2 dias • Não publicado
                </p>
              </div>

              <div className="flex gap-4">
                <button className="text-blue-600 text-sm font-medium">
                  Editar
                </button>
                <button className="text-gray-400 text-sm">
                  Excluir
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>
    </div>
  );
};
