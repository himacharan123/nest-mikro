import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postStatus } from '../enums/postStatus.enum';
import { postType } from '../enums/postType.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is the title',
    description: 'Title for Blog post',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  @MaxLength(512)
  title: string;
  @ApiProperty({
    enum: postType,
    description: "Possible values are : 'post','page','story','series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;
  @ApiProperty({
    description: "for Example-'my-url'",
    example: 'my-blog-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces.for example "my-url"',
  })
  @MaxLength(256)
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "Possible values 'draft','scheduled','review','published'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;
  @ApiPropertyOptional({
    description: 'This is the content of the post',
  })
  @IsString()
  @IsOptional()
  content?: string;
  @ApiPropertyOptional({
    description:
      'serialize your json object else a validation error will be thrown  ',
    example:
      '\r\n    "@context": "https://schema.org",\r\n    "@type": "Person"\r\n  }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Add Image url',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @MaxLength(1024)
  @IsOptional()
  @IsUrl({}, { message: 'featuredImageUrl must be a valid URL' })
  featuredImageUrl?: string;
  @ApiPropertyOptional({
    description: 'date which on which blog post is published ',
    example: '2024-09-24T07:46:32+0000',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;
  @ApiPropertyOptional({
    description: 'Array of id tags   ',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({each:true})

  tags?:number[];
  @ApiPropertyOptional({
    type: 'object',
    required: false,
    items: {
      type: 'object',
      properties: {
        metavalue: {
          type: 'json',
          description:
            'The metavalue is a json string ',
          example: '{"sidebar enabled":true} ',
        },
        
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;
@ApiProperty(
  {
    type:'integer',
    required:true,
    example:1,
  }
)
@IsNotEmpty()
  @IsInt()
  authorId:number;
}
