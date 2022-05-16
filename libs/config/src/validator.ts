import { registerDecorator } from 'class-validator';

type ValidatorFunction = (value: unknown, ...args: any[]) => boolean;

const registerValidator = (
  object: unknown,
  propertyName: string,
  validator: ValidatorFunction,
  ...args
) => {
  Reflect.defineMetadata(
    `custom:validator:${propertyName}:${validator.name}`,
    validator.name,
    object,
    propertyName,
  );
  registerDecorator({
    name: validator.name,
    target: object.constructor,
    propertyName: propertyName,
    constraints: [],
    options: undefined,
    validator: {
      validate(value: any) {
        return validator(value, ...args);
      },
      defaultMessage(): string {
        return `${propertyName} must respect ${validator.name} constraint`;
      },
    },
  });
};

export const Validator = (validator: ValidatorFunction, ...args) => {
  return (object: any, propertyName: string) => {
    registerValidator(object, propertyName, validator, ...args);
  };
};

export const ConfigValidators = (...validators: Array<ValidatorFunction>) => {
  return (object: any, propertyName: string) => {
    validators.forEach((validator) =>
      registerValidator(object, propertyName, validator),
    );
  };
};
