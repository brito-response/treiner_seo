import NewsCard from '@/components/NewsCard';
import { newsMock } from '@/data/news';

export default function pageBrasil() {
  const brasilNews = newsMock.filter((news) => news.category === 'Brasil'); 

  return (
    <main className="container mx-auto px-4 py-8 space-y-10 mt-20">
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Brasil</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brasilNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      </section>
    </main>
  );
};
