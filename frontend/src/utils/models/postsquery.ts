import { Category } from "./categories";
import { Tag } from "./tags";
import { User } from "./users";

export type PostQuery = {
    postId: string;
    title: string;
    content: string;
    image:string;
    status: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    user: User;
    categories: Category[];
    tags: Tag[];
};

export type PaginatedPosts = {
    data: PostQuery[];
    count: number;
};