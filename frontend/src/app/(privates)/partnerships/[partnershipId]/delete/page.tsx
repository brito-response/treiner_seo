import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { partnershipId: string; }; };
export default async function PartnershipDeletePage({ params }: PageProps) {
  const { partnershipId } = await params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse Partnership?</h2>
    <FormDeleteResource resource={"partnerships"} resourceId={partnershipId} />
  </div>;
}
