import { PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
  Matches,
  IsOptional,
} from 'class-validator';
import { CreateTaskDto } from './create-task.dto.js';
import { ETaskStatus } from '../task.js';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsString()
  @Matches(/^(?=.{0,10}$)[A-Za-z0-9\-_]+$/, {
    message: 'Invalid format or length(max: 10)',
  })
  title: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  description: string;

  @IsOptional()
  @IsEnum(ETaskStatus)
  status: ETaskStatus;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Max(10)
  @Min(0)
  priority: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;
}
