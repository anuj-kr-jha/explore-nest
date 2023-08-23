import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { CreateTaskDto } from './create-task.dto.js';

export class FindTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @Max(10)
  @Min(0)
  priority: number;

  @IsOptional()
  @IsUUID('4')
  id: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  createdAt: Date;
}
