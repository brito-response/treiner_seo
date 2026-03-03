import { Category } from "./categories";
import { Tag } from "./tags";
import { User } from "./users";

export type PostHilight = {
    postId: string;
    title: string;
    image?: string;
    highlightPost: number;
    publishedAt?: string;
    user: User;
    categories: Category[];
    tags: Tag[];
}