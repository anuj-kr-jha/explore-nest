import { BadRequestException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

export function ValidateObjectIdField(fieldName = '', position = 0) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const arg = args[position];
      let fieldValue = '';

      if (typeof arg === 'string') fieldValue = arg;
      else if (typeof arg === 'object' && arg.hasOwnProperty(fieldName)) fieldValue = arg[fieldName];
      else throw new BadRequestException(`Invalid ${fieldName || 'Id'}`);

      try {
        const objectId = new ObjectId(fieldValue);

        if (typeof arg === 'string')
          return originalMethod.apply(
            this,
            args.map((arg, index) => (index === position ? objectId : arg)),
          );
        arg[fieldName] = objectId;
        return originalMethod.apply(this, args);
      } catch (error) {
        // console.error(error?.message, error?.stack);
        throw new BadRequestException(`Invalid ${fieldName || 'Id'}`);
      }
    };
  };
}
