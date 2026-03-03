import NewsCard from "@/components/NewsCard";
import { newsMock } from "@/data/news";


export default function pageTecnologia() {
  const tecnologiaNews = newsMock.filter((news) => news.category === 'Tecnologia'); 
  
    return (
      <main className="container mx-auto px-4 py-8 space-y-10 mt-20">
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Tecnólogia</h2>
  
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tecnologiaNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </section>
      </main>
    )
};
