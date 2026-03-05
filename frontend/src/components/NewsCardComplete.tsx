import Image from "next/image";
import Link from "next/link";
import { PostQuery } from "@/utils/models/postsquery";
import { formUrlImage } from "@/utils/utils";

type Props = {
  news: PostQuery;
};

export const NewsCardComplete = ({ news }: Props) => {
  // Formata a data de criação
  const createdAt = new Date(news.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group border border-gray-300 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col">
      {/* Imagem */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={formUrlImage(news.image) || "/placeholder.png"}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-1">
          {news.categories.map((category) => (
            <span
              key={category.categoryId}
              className="text-xs font-bold uppercase text-red-600 bg-red-100 px-2 py-1 rounded"
            >
              {category.name}
            </span>
          ))}
        </div>

        {/* Título */}
        <h3 className="font-bold leading-snug line-clamp-2 text-gray-900">
          {news.title}
        </h3>

        {/* Conteúdo resumido */}
        <p className="text-sm text-gray-600 line-clamp-3">{news.content}</p>

        {/* Tags */}
        {news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {news.tags.map((tag) => (
              <span
                key={tag.tagId}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Autor e data */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            {news.user.photo && (
              <Image
                src={news.user.photo}
                alt={news.user.name}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            )}
            <span className="text-xs text-gray-700">{news.user.name}</span>
          </div>
          <span className="text-xs text-gray-500">{createdAt}</span>
        </div>

        {/* Ler mais */}
        <Link
          href={`/noticia/${news.postId}`}
          className="inline-block mt-3 text-sm font-semibold border-b border-transparent hover:border-black transition-all"
        >
          Ler mais →
        </Link>
      </div>
    </article>
  );
};