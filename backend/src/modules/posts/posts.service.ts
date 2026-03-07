import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { BaseService } from 'src/common/base/base.service';
import { Post, PostStatus } from './entities/post.entity';
import { PostsRepository } from './repository/post.repository';
import sanitizeHtml from 'sanitize-html';
import { ApiError } from 'src/common/errors/api-error.class';
import { FindPostsQueryDto } from './dto';
import { InferCreationAttributes } from 'sequelize';

@Injectable()
export class PostsService extends BaseService<Post, CreatePostDto, UpdatePostDto> {
  constructor(private readonly postsRepository: PostsRepository) {
    super(postsRepository);
  }
  async createPost(dto: CreatePostDto, userId: string) {
    const sanitizedContent = sanitizeHtml(dto.content,
      {
        allowedTags: ['p', 'b', 'i', 'u', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'br'],
        allowedAttributes: { a: ['href', 'target'] },
        allowedSchemes: ['http', 'https', 'mailto'],
      });

    if (sanitizedContent !== dto.content) throw new ApiError("we cannot create a post with this content; you submitted inappropriate content.", 400);
    return this.postsRepository.createPost({ ...dto, userId, status: PostStatus.DRAFT } as InferCreationAttributes<Post>);
  }

  async publishPost(postId: string, userId: string) {
    const post = await this.findOne(postId);
    if (post.userId !== userId) throw new ApiError('Not allowed', 403);
    return await this.postsRepository.publish(postId);
  }


  async listPublic(limit: number, offset: number) {
    return await this.postsRepository.findPublished(limit, offset);
  }

  async listByAuthor(userId: string) {
    return await this.postsRepository.findByAuthor(userId);
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.findOne(postId);
    if (post.userId !== userId) throw new ApiError('Not allowed', 403);
    return await this.postsRepository.softDelete(postId);
  }

  async addPhotoOfPost(id: string, newImage: string) {
    const post = await this.postsRepository.getInstanceOfPostById(id);
    if (!post) throw new ApiError('Post not found', 404);
    post.image = newImage;
    await post.save();
    return post;
  }

  async findAllByQuery(query: FindPostsQueryDto): Promise<{ rows: Post[]; count: number }> {
    return this.postsRepository.findByQuery(query);
  }

  async setTags(postId: string, tagIds: string[], userId: string) {
    const post = await this.findOne(postId);
    if (post.userId !== userId) throw new ApiError('Not allowed', 403);

    const success = await this.postsRepository.setTags(postId, tagIds);
    if (!success) throw new ApiError('Post not found', 404);
    return await this.findOne(postId);
  }

  async setCategories(postId: string, categoryIds: string[], userId: string) {
    const post = await this.findOne(postId);
    if (post.userId !== userId) throw new ApiError('Not allowed', 403);

    const success = await this.postsRepository.setCategories(postId, categoryIds);
    if (!success) throw new ApiError('Post not found', 404);
    return await this.findOne(postId);
  }

  async getMostHighlighted(): Promise<Post> {
    const post = await this.postsRepository.findMostHighlighted();
    if (!post) throw new ApiError('No highlighted posts found', 404);
    return post;
  }

  async getTopHighlighted(): Promise<Post[]> {
    return await this.postsRepository.findTopHighlighted(6);
  }

  async findOneWithRelationships(postId: string): Promise<Post> {
    const post = await this.postsRepository.findByIdRelationships(postId);
    if (!post) throw new ApiError('No highlighted posts found', 404);
    return post;
  }

  async highlightPost(postId: string): Promise<Post> {
    const post = await this.findOne(postId);
    if (!post) throw new ApiError('Post not found', 404);
    if (post.status !== PostStatus.PUBLISHED) throw new ApiError('Only published posts can be highlighted', 400);

    const updated = await this.postsRepository.incrementHighlight(postId);
    if (!updated) throw new ApiError('Post not found', 404);
    return updated;
  }
  
}
