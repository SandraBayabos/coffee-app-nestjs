// import { Type } from 'class-transformer'
import { IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
  // make sure that the type coming in is a number but can remove because added in enableImplicitConversion: true in main.ts
  // marks this property as optional so no errors will be thrown if it's missing/indefined
  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsPositive()
  // @Type(() => Number)
  offset: number;
}
