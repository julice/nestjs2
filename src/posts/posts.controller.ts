import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dot';

@ApiTags('文章')
@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}

  @ApiOperation({ summary: '获取文章列表' })
  @Get()
  GetAll() {
    return this.PostsService.getAll();
  }

  @ApiOperation({ summary: '创建文章' })
  @Post('create')
  Create(@Body() body: CreatePostDto) {
    return this.PostsService.create(body);
  }

  @ApiOperation({ summary: '获取文章' })
  @Post('index')
  findAll(@Body() body) {
    return this.PostsService.findAll(body);
  }

  @ApiOperation({ summary: '查看文章详情' })
  @Post('show')
  findById(@Body() body) {
    const id = body.id;
    return this.PostsService.findById(id);
  }

  @ApiOperation({ summary: '更新文章' })
  @Post('update')
  updateById(@Body() body) {
    const id = body.id;
    return this.PostsService.updateById(id, body);
  }

  @ApiOperation({ summary: '删除文章' })
  @Post('delete')
  deleteById(@Body() body) {
    const id = body.id;
    return this.PostsService.removeById(id);
  }
}
