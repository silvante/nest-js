import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreateNewPostDTO } from './dtos/createPost.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('all')
  @Roles(["admin", "owner"])
  @UseGuards(AuthGuard)
  async findAll() {
    return this.postService.getAllPosts();
  }

  @Post('new')
  async createNewPot(@Body() dto: CreateNewPostDTO) {
    const post = await this.postService.createNewPost(dto);
    return post;
  }
}
