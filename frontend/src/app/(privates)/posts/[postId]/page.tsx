interface PageProps {params: {postId: string;};};

  export default function PostDetailPage({ params }: PageProps) {
    const { postId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        Post detail: {postId}
      </div>
    );
  }
