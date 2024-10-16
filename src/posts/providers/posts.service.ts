import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';
import { UserService } from '../../users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

import { Post } from '../post.entity';
import { User } from '../../users/user.entity';

import { TagsService } from '../../tags/providers/tags.service';
import { Tag } from '../../tags/tag.entity';
import { MetaOption } from '../../meta-options/meta-option.entity';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { TryStatement } from 'ts-morph';
import { GetPostDto } from '../dtos/get-post.dto';
import { skip } from 'node:test';
import { PaginationProvider } from 'src/common/pagination/provider/pagination.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly userService: UserService,
    // Injecting EntityManager
    private readonly em: EntityManager,
    private readonly tagService: TagsService,
    private readonly paginationProvider:PaginationProvider
  ) {}

  // Creating a new post
  public async create(createPostDto: CreatePostDto) {
    // Fetch the user and tags using the injected EntityManager

    const user = await this.em.findOne(User, { id: createPostDto.authorId });
    const tags = await this.em.find(Tag, { id: { $in: createPostDto.tags } });

    // Create the post
    const post = this.em.create(Post, {
      ...createPostDto,
      author: user,
      tags: tags,
      metaOptions: createPostDto.metaOptions
        ? {
            metaValue: createPostDto.metaOptions.metaValue, // Use the object directly
          }
        : null,
    });

    // Save the post
    await this.em.persistAndFlush(post);
    await this.em.populate(post, ['tags']);
    return post; // Return the created post or any relevant data
  }

  // Finding all posts by a user
  public async findAllPosts(postQuery:GetPostDto,userId?: string) {
    let user;

    // If a userId is provided, ensure the user exists
    if (userId) {
      user = await this.userService.findMyId(userId);

      if (!user) {
        throw new Error('User not found');
      }
    }

    // Fetch all posts, or filter by author if userId is provided
    const posts = await this.em.find(
      Post,
      user ? { author: user } : {}, // If user is defined, filter by author
      {
        populate: ['metaOptions', 'author', 'tags'],
        offset: (postQuery.page - 1) * postQuery.limit, // Equivalent to skip
        limit: postQuery.limit, // Equivalent to take
      },
    );
  
    return posts;
  }

  // Deleting a post by its ID
  public async deletePost(id: number) {
    // Find the post by its ID, populating metaOptions
    const post = await this.em.findOne(Post, id, { populate: ['metaOptions'] });

    if (!post) {
      throw new Error('Post not found');
    }

    // Remove the post
    await this.em.removeAndFlush(post);

    return { deleted: true, id };
  }

  // Finding a user by their ID
  public async findOneById(id: number) {
    const user = await this.em.findOne(User, { id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
  // updating post
  public async updatePost(patchPostDto: PatchPostDto) {
    // find the tag
    // find the post
    // update the post
    //assign the new tags
    //save the post and return

    let tags = undefined;
    let post = undefined;

    try {
      tags=await this.tagService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please',
      );
    }
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        'Please check your ids and ensure they are correct',
      );
    }
try {
  post=await this.em.findOne(Post, { id: patchPostDto.id });

} catch (error) {
  throw new RequestTimeoutException(
    'Unable to process your request at the moment please',
  );
}
if(!post){
throw new BadRequestException('The post ID does not exist')
}
    // update the post
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType; // Corrected here
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishedOn = patchPostDto.publishedOn ?? post.publishedOn;

    // save the post and return
    

    // persist and flush the changes in one step
   
   try{
    post.tags.set(tags);
    await this.em.persistAndFlush(post);
   } catch(error){
    throw new RequestTimeoutException('Unable to process your request at the moment please')
   }


    return post;
  }



  
}
