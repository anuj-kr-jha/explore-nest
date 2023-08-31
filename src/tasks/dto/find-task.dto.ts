import { ObjectId } from 'mongodb';
import { PartialType } from '@nestjs/mapped-types';
import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { CreateTaskDto } from './create-task.dto.js';

export class FindTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @Transform(({ value }) => {
    try {
      return new ObjectId(value);
    } catch (error) {
      throw new BadRequestException('Invalid MongoDB ObjectId');
    }
  })
  _id: ObjectId;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 })
  @Max(10)
  @Min(0)
  readonly priority: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly createdAt: Date;
}
