import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewPostDTO } from './dtos/createPost.dto';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async createNewPost(dto: CreateNewPostDTO) {
    return await this.prisma.post.create({
      data: {
        title: dto.title,
        description: dto.description,
        creator: {
          connect: { id: dto.creator_id },
        },
      },
      include: {
        creator: true,
      },
    });
  }

  async getAllPosts() {
    return await this.prisma.post.findMany({
      include: {
        creator: true,
      },
    });
  }
}
