import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  readonly author: string;

  // 必选
  @ApiProperty({ description: '内容' })
  readonly content: string;
  // 可选
  @ApiPropertyOptional({ description: '封面' })
  readonly thumb_url: string;
  @ApiPropertyOptional({ description: '类型' })
  readonly type: number;
}
