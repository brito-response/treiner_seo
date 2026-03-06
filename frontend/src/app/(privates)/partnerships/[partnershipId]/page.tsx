interface PageProps {params: {partnershipId: string;};};

  export default function PartnershipDetailPage({ params }: PageProps) {
    const { partnershipId } = params;
    return (
      <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        Partnership detail: {partnershipId}
      </div>
    );
  }
