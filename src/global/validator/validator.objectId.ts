import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongodb';

@ValidatorConstraint({ name: 'isMongoId', async: false })
export class IsMongoIdConstraint implements ValidatorConstraintInterface {
  validate(id: any, _args: ValidationArguments) {
    return ObjectId.isValid(id);
  }

  defaultMessage(_args: ValidationArguments) {
    return 'Invalid MongoDB ObjectId.';
  }
}

export function IsMongoId(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsMongoIdConstraint,
    });
  };
}
