interface PageProps {params: {categoryId: string;};};

  export default function CategoryDetailPage({ params }: PageProps) {
    const { categoryId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        Category detail: {categoryId}
      </div>
    );
  }
