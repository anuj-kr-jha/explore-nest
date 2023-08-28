import { IsEnum, IsNotEmpty, IsNumber, IsString, Length, Max, Min, Matches } from 'class-validator';
import { ETaskStatus } from '../interfaces/tasks.interface.js';
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9 ]{0,10}$/, {
    message: `title should match the pattern: $constraint1 but received value: $value not matching pattern`,
  })
  readonly title: string;

  @IsString()
  @Length(0, 100)
  readonly description: string;

  @IsNotEmpty()
  @IsEnum(ETaskStatus)
  readonly status: ETaskStatus;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Max(10)
  @Min(0)
  readonly priority: number;
}
