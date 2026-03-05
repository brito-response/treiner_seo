import Link from "next/link";

type Atalho = { content: string, url: string };
type HeaderAtalhoProps = {
    atalhos: Atalho[];
};

export const HeaderAtalho: React.FC<HeaderAtalhoProps> = ({ atalhos }) => {
    return (
        <div className="border-b bg-white/70 backdrop-blur sticky top-0 mb-5 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-tight">Próximos recursos</h1>
                <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                    {atalhos.map((atalho) => (
                        <Link key={atalho.url} href={atalho.url} className="hover:text-black transition">
                            {atalho.content}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>);
}