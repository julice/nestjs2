import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';

import envConfig from '../config/env';
@Module({
  imports: [
    PostsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envConfig.path,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', 'root123'),
        database: configService.get('DB_DATABASE', 'blog'),
        timezone: '+8:00',
        // 是否将实体同步到数据库
        synchronize: true,
        // 自动配置实体
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class AppModule {}
