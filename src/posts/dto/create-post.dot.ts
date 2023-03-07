import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: '文章标题' })
  @IsNotEmpty({ message: '文章标题必填' })
  readonly title: string;

  @ApiProperty({ description: '作者' })
  @IsNotEmpty({ message: '缺少作者信息' })
  readonly author: string;

  // 必选
  @ApiProperty({ description: '内容' })
  @IsNotEmpty({ message: '缺少文章内容' })
  readonly content: string;
  // 可选
  @ApiPropertyOptional({ description: '封面' })
  readonly thumb_url: string;
  @ApiPropertyOptional({ description: '类型' })
  readonly type: number;
}
