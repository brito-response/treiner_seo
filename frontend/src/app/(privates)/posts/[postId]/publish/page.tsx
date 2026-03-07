import { FormPublish } from "@/forms/posts";
import { Post } from "@/utils/models/posts";

async function getPostById(postId: string): Promise<Post | null> {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${postId}`, {method: "GET",cache: "no-store"});
        if (!response.ok) { return null; };
        const post: Post = await response.json();
        return post;
    } catch (error) {
        console.error("Erro ao buscar post:", error);
        return null;
    }
};
interface PageProps { params: { postId: string; }; };
export default async function PostPublish({ params }: PageProps) {
    const { postId } = params;
    const post: Post | null = await getPostById(postId);

    return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        <h2 className="text-center">Tem certeza que vc quer publicar esse Post?</h2>
        {post ? (<FormPublish post={post} />) : (<>Não é possivel editar um post que nem existe</>)}
    </div>;
}
