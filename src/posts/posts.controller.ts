import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}
  @Get()
  GetAll() {
    return this.PostsService.getAll();
  }

  @Post('create')
  Create(@Body() body) {
    return this.PostsService.create(body);
  }

  @Post('index')
  findAll(@Body() body) {
    return this.PostsService.findAll(body);
  }

  @Post('show')
  findById(@Body() body) {
    const id = body.id;
    return this.PostsService.findById(id);
  }

  @Post('update')
  updateById(@Body() body) {
    const id = body.id;
    return this.PostsService.updateById(id, body);
  }

  @Post('delete')
  deleteById(@Body() body) {
    const id = body.id;
    return this.PostsService.removeById(id);
  }
}
