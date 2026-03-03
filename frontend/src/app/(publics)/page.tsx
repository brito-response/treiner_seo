import Hero from '@/components/Hero';
import NewsSection from '@/components/NewsSection';

export default function Home() {
  const cidades = [{ nome: "São joão do Sabugi", estado: "RN" }, { nome: "Caicó", estado: "RN" }, { nome: "Ipueira", estado: "RN" }];
  return (
    <div className="container mx-auto px-4 py-4 space-y-10 mt-6">
      <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
        Fique por dentro de tudo o que está acontecendo em  <span className="block text-lg md:text-2xl font-medium text-gray-500 mt-2">{cidades.map(cidade => cidade.nome).join(", ")} - RN </span>
      </h1>
      <Hero />
      <NewsSection />
    </div>
  );
}
