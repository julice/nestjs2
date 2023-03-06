import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { count } from 'console';
import {
  getRepository,
  createConnection,
  Repository,
  DataSource,
} from 'typeorm';
import { PostEntity } from './posts.entity';

export interface PostRo {
  data: {
    content: PostEntity[];
  };
  count: number;
}
@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}
  getAll() {
    return 'getAll';
  }

  //   创建文章
  async create(post: Partial<PostEntity>): Promise<PostEntity> {
    const { title } = post;
    if (!title) {
      throw new HttpException('缺少文章标题', 500);
    }
    const doc = await this.postsRepository.findOne({ where: { title } });
    if (doc) {
      throw new HttpException('文章已存在', 500);
    }
    return this.postsRepository.save(post);
  }

  //   获取文章
  async findAll(query): Promise<PostRo> {
    const qb = await this.postsRepository.createQueryBuilder();

    const { pageNum = 0, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.offset(pageSize * pageNum);
    qb.orderBy('create_time', 'DESC');
    const posts = await qb.getMany();
    const count = await qb.getCount();
    return {
      data: {
        content: posts,
      },
      count: count,
    };
  }

  async findById(id) {
    const existPost = await this.postsRepository.findOne({ where: { id: id } });
    return existPost;
  }

  async updateById(id, post) {
    console.log(id, 222);
    const existPost = await this.postsRepository.findOne({ where: { id } });
    if (!existPost) {
      throw new HttpException('Id is not found', 500);
    }
    const updatePost = this.postsRepository.merge(existPost, post);
    return this.postsRepository.save(updatePost);
  }

  async removeById(id) {
    const existPost = await this.postsRepository.findOne({ where: { id: id } });
    if (!existPost) {
      throw new HttpException('Id is not found', 500);
    }
    return await this.postsRepository.delete(existPost);
  }
}
