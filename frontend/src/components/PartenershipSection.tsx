import { PostHilight } from '@/utils/models/posthilight';
import { NewsCard } from './NewsCard';
import { NotfoundInfo } from './NotfoundInfo';

async function getTop6Hilight(): Promise<PostHilight[]> {
  try {
    const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/highlighted/top6`, {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const posts: PostHilight[] = await response.json();
    return posts;
  } catch (error) {
    return [];
  }
};

export default async function PartenershipSection() {
  const posthilight = await getTop6Hilight();

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">Nossas parcerias</h2>

      {posthilight.length === 0 ? (
        <NotfoundInfo title={' Não há novas notícias na base de dados'} content={' Assim que novas publicações forem destacadas, elas aparecerão aqui. Volte em breve!'} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-5">
          {posthilight.map((item) => (
            <NewsCard key={item.postId} news={item} />
          ))}
        </div>
      )}
    </section>
  );
}
