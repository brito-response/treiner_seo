import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormPublish } from "@/forms/posts";
import { Post } from "@/utils/models/posts";
import { Session } from "@/utils/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getPostById(postId: string, token: string): Promise<Post | null> {
    try {
        const response = await fetch(`${process.env.NEXT_BACKEND_URL}/posts/${postId}`, {
            method: "GET",
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );
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
    const session: Session | null = await getServerSession(authOptions);
    if (!session) redirect("/manager");
    const { postId } = await params;
    const post: Post | null = await getPostById(postId, session.accessToken);

    return <div className="w-full min-h-screen flex flex-col bg-[--bg-section-100] p-10 transition-colors duration-500">
        <h2 className="text-center">Tem certeza que vc quer publicar esse Post?</h2>
        {post ? (<FormPublish post={post} />) : (<>Não é possivel editar um post que nem existe</>)}
    </div>;
}
