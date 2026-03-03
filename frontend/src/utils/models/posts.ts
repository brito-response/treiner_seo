export enum PostStatus { DRAFT = 'DRAFT', PUBLISHED = 'PUBLISHED' };
export type Post ={
    postId: string,
    title: string,
    image: string,
    content: string,
    status: PostStatus,
    publishedAt: Date,
    createdAt:  Date,
    updatedAt:  Date,
    userId: string,
}