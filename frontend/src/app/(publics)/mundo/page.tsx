import NewsCard from '@/components/NewsCard';
import { newsMock } from '@/data/news';

export default function pageMundo() {
    const mundoNews = newsMock.filter((news) => news.category === 'Mundo'); 
    
      return (
        <main className="container mx-auto px-4 py-8 space-y-10 mt-20">
          <section className="space-y-6">
            <h2 className="text-2xl font-bold">Mundo</h2>
    
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mundoNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </section>
        </main>
  )
};
