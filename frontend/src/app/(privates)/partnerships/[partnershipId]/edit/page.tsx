import { authOptions } from "@/app/api/auth/[...nextauth]/route";
  import { FormEditPartnership } from "@/forms/partnerships";
  import { Partnership } from "@/utils/models/partnerships";
  import { Session } from "@/utils/route";
  import { getServerSession } from "next-auth";
  import { redirect } from "next/navigation";

  interface PageProps { params: { partnershipId: string; }; };

  async function getPartnershipById(partnershipId: string, token: string): Promise< Partnership | null> {
    try {
      const response = await fetch(`${process.env.NEXT_BACKEND_URL}/partnerships/${partnershipId}`,
        {
          method: "GET",
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) { return null; };
      const partnership: Partnership = await response.json();
      return partnership;
    } catch (error) {
      console.error("Erro ao buscar partnership:", error);
      return null;
    }
  };

  export default async function PartnershipEditPage({ params }: PageProps) {
    const { partnershipId } = await params;
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/");
    const partnership: Partnership | null = await getPartnershipById(partnershipId, session.accessToken);
    return (
      <div className="w-full min-h-screen bg-[--bg-section-100] p-10 transition-colors duration-500">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">

          {partnership ? (
            <>
              {/* Informações do post */}
              <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow">
                <h1 className="text-2xl font-semibold">Editar Partnership</h1>
                <p className="text-sm opacity-70 mt-1">
                  Este Partnership foi • Criado em {partnership.createdAt.toString()}
                </p>
              </section>

              {/* Formulário */}
              <FormEditPartnership partnership={partnership} />
            </>
          ) : (
            <section className="bg-white/70 dark:bg-black/20 rounded-xl p-6 shadow text-center">
              <h1 className="text-xl font-semibold">
                Post não encontrado
              </h1>
              <p className="text-sm opacity-70 mt-2">
                O Partnership que você está tentando editar não existe ou foi removido.
              </p>
            </section>
          )}

        </div>
      </div>
    );
  };

