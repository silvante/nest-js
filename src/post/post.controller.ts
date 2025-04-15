import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateNewPostDTO } from './dtos/createPost.dto';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
  ) {}

  @Get('all')
  async findAll() {
    return this.postService.getAllPosts();
  }

  @Post('new')
  async createNewPot(@Body() dto: CreateNewPostDTO) {
    const post = await this.postService.createNewPost(dto);
    return post;
  }
}
