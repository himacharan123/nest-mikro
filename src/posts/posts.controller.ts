import { Controller, Get, Delete,Param, Post, Body, Patch, Query, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostDto } from './dtos/get-post.dto';


@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get(':userId?')
  public getAllPost(@Param('userId') userId: string,@Query() postQuery:GetPostDto) {
   
   console.log(userId);
    return this.postService.findAllPosts(postQuery,userId);
  }
  @ApiOperation({
    summary: 'This api is used create a Blog post ',
  })
  @ApiResponse({
    status: 201,
    description: 'you get 201 response if your post is sucessfully created  ',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  @ApiOperation({
    summary:"api to update the post "
  }

  )
  @ApiResponse({
    description:"you get 200 response when the post is sucessfully updated "
  })
  @Patch()
  public updatePost(@Body()patchPostDto:PatchPostDto){
return this.postService.updatePost(patchPostDto);

  
  }

  @Delete()
  public deletePost(@Query('id',ParseIntPipe)id:number){
return this.postService.deletePost(id);
  }

}
