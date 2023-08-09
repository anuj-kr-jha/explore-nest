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
} from 'class-validator';
import { ETaskStatus } from '../task.js';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.{0,10}$)[A-Za-z0-9\-_]+$/, {
    message: 'Invalid format or length(max: 10)',
  })
  title: string;

  @IsString()
  @Length(0, 100)
  description: string;

  @IsNotEmpty()
  @IsEnum(ETaskStatus)
  status: ETaskStatus;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Max(10)
  @Min(0)
  priority: number;

  @IsDate()
  createdAt: Date;
}
