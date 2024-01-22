import { Prisma } from '@prisma/client';
import { StatsFields } from '@statistics/enums/stats-fields.enum';
import { Type } from 'class-transformer';
import { IsEnum, IsMongoId, IsOptional, IsPositive } from 'class-validator';

export class StatsQueryOneDto {
  @IsOptional()
  @IsMongoId()
  readonly productId?: string;

  @IsEnum(StatsFields)
  readonly field: StatsFields;

  @IsEnum(Prisma.SortOrder)
  readonly sortOrder: Prisma.SortOrder;

  @IsPositive()
  @Type(() => Number)
  readonly limit: number;
}
