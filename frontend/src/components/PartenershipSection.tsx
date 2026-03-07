import Image from "next/image";
import Link from "next/link";
import { NotfoundInfo } from "./NotfoundInfo";
import { Partnership } from "@/utils/models/partnerships";
import { formUrlImage } from "@/utils/utils";

async function getpartnerships(): Promise<Partnership[]> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/partnerships`, { cache: "no-store" });
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

export default async function PartenershipSection() {
  const partnerships = await getpartnerships();

  return (
    <section className="space-y-6 py-4 bg-slate-50 rounded-t-2xl">
      <h2 className="text-2xl font-bold">Nossas parcerias</h2>

      {partnerships.length === 0 ? (
        <NotfoundInfo title="Não há parcerias cadastradas na base de dados" content="Assim que novas publicações forem destacadas, elas aparecerão aqui. Volte em breve!" />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-6 justify-items-start">
          {partnerships.map((item) => (
            <Link
              key={item.partnershipId}
              href={item.website || "#"}
              target="_blank"
              className="group relative w-full h-16 flex items-center justify-start transition"
            >
              <Image src={formUrlImage(item.logo) || ""} alt={item.businessName} fill unoptimized className="object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition duration-300" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}