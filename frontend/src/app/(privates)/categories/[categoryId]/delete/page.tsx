import { FormDeleteResource } from "@/forms/shared";

interface PageProps { params: { categoryId: string; }; };
export default function CategoryDeletePage({ params }: PageProps) {
  const { categoryId } = params;

  return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
    <h2 className="text-center">Tem certeza que vc quer deletar esse Category?</h2>
    <FormDeleteResource resource={"categories"} resourceId={categoryId} />
  </div>;
}
