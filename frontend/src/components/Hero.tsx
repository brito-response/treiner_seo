import { PostHilight } from '@/utils/models/posthilight';
import { formUrlImage } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import { NotfoundInfo } from './NotfoundInfo';

async function getHilight(): Promise<PostHilight | null> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/highlighted/top`,
      { cache: "no-store" }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

export default async function Hero() {
  const news = await getHilight();
  if (!news) {
    return (
      <section className="w-full">
        <NotfoundInfo title={'Nenhuma notícia em destaque'} content={'Assim que uma publicação for destacada, ela aparecerá aqui como manchete principal.'} />
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="relative w-full h-105 md:h-130 rounded-2xl overflow-hidden">
        <Image src={formUrlImage(news.image)} alt={news.title} fill priority className="object-cover transition-transform duration-700 hover:scale-105" />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex items-end">
          <div className="p-6 md:p-10 max-w-2xl text-white">

            {news.categories?.[0] && (
              <span className="inline-block bg-red-600 text-xs uppercase font-bold px-3 py-1 rounded-full mb-3">
                {news.categories[0].name}
              </span>
            )}

            <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-3">
              {news.title}
            </h2>

            <Link href={`/noticia/${news.postId}`} className="inline-block font-semibold border-b border-transparent hover:border-white transition-all duration-300">
              Ler matéria completa →
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}