import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
