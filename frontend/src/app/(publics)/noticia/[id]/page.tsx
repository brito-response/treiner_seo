import Image from 'next/image';
import { notFound } from 'next/navigation';
import { newsMock } from '@/data/news';
import BackButton from '@/components/BackButton';

interface PageProps {
  params: {
    id: Promise<{ id: string }>;
  };
}

export default async function pageNoticia({ params }: PageProps) {
  const { id } = await params;

  const noticia = newsMock.find((item) => item.id === Number(id));

  console.log('Noticia encontrada:', noticia);

  if (!noticia) {
    return notFound();
  }

  return (
    <main className="mx-auto px-4 py-10 max-w-4xl mt-20">
      <p className="text-red-600 font-semibold uppercase mb-2">
        {noticia.category}
      </p>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">{noticia.title}</h1>

      <p className="text-gray-500 mb-6">{noticia.description}</p>

      <div className="relative w-full h-75 md:h-96 mb-8">
        <Image
          src={noticia.image}
          alt={noticia.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <article className="prose max-w-none">
        <p className="text-lg leading-loose tracking-wider">
          {noticia.content}
        </p>
      </article>
      
      <BackButton />
    </main>
  );
};
