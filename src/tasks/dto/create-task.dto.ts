import { IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Matches } from 'class-validator';
import { ETaskStatus } from '../task.d.js';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9 ]{0,10}$/, {
    message: `title should match the pattern: $constraint1 but received value: $value not matching pattern`,
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
}
