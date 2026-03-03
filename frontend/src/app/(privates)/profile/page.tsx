import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Profile() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) redirect("/");

  return (
    <div className="w-full min-h-screen bg-neutral-50 text-neutral-900">

      <main className="max-w-8xl mx-auto px-6 py-24 relative">
        {/* Nome gigante tipo capa de livro */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-12">
          {session.user?.name}
        </h1>

        {/* Bloco autor */}
        <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">

          {/* Avatar deslocado */}
          <div className="relative w-40 h-40">
            <Image src={session.user?.image || "/logo.png"} alt="Foto do autor" width={160} height={160} className="rounded-full object-cover grayscale hover:grayscale-0 transition duration-500" />
          </div>

          <div>
            {/* Email estilo assinatura */}
            <p className="font-mono text-sm tracking-widest text-neutral-500 mb-6 uppercase">
              {session.user?.email}
            </p>

            {/* Bio estilo manifesto */}
            <p className="text-xl leading-relaxed font-light">
              {session.user?.userStatus ||
                "Escrevo sobre tecnologia, internet, ambição e as pequenas obsessões que constroem grandes carreiras. Este é meu espaço para pensar em público."}
            </p>

            <div className="mt-10 flex gap-8 text-sm uppercase tracking-wide">
              <button className="border-b border-black hover:opacity-60 transition">
                Editar Perfil
              </button>

              <button className="border-b border-black hover:opacity-60 transition">
                Meus Artigos
              </button>
            </div>
          </div>

        </div>

        {/* Seção de artigos estilo coluna */}
        <section className="mt-28">
          <h2 className="text-2xl font-semibold mb-12 tracking-tight">
            Últimos escritos
          </h2>

          <div className="space-y-16">

            <article className="group cursor-pointer">
              <h3 className="text-3xl font-bold group-hover:underline">
                A solidão produtiva do programador moderno
              </h3>
              <p className="text-neutral-500 mt-3 max-w-2xl">
                Pensamentos sobre foco profundo, distrações digitais e ambição silenciosa.
              </p>
            </article>

            <article className="group cursor-pointer">
              <h3 className="text-3xl font-bold group-hover:underline">
                Freelance não é liberdade, é responsabilidade
              </h3>
              <p className="text-neutral-500 mt-3 max-w-2xl">
                O lado que ninguém fala sobre trabalhar por conta própria.
              </p>
            </article>

          </div>
        </section>

      </main>
    </div>
  );
}