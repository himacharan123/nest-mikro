import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @IsOptional()
  limit: number=10;
  @IsOptional()
  @IsPositive()
  @IsOptional()
  page: number=1;
}
