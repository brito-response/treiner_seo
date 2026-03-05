import Image from "next/image";
import Link from "next/link";
import { PostHilight } from "@/utils/models/posthilight";
import { formUrlImage } from "@/utils/utils";

type Props = { news: PostHilight; };

export const NewsCard = ({ news }: Props) => {
  return (
    <article className="group border border-gray-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
      <div className="relative w-full h-44 overflow-hidden">
        <Image src={formUrlImage(news.image) || ""} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
      </div>

      <div className="p-4 space-y-2">
        <span className="text-xs font-bold uppercase text-red-600">
          {news.categories.map(category => category.name)}
        </span>

        <h3 className="font-bold leading-snug line-clamp-2">
          {news.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {news.title}
        </p>

        <Link href={`/noticia/${news.postId}`} className="inline-block text-sm font-semibold border-b border-transparent hover:border-black transition-all">
          Ler mais →
        </Link>
      </div>
    </article>
  );
}