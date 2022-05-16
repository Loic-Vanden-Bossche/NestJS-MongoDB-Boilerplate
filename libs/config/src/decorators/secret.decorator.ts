import 'reflect-metadata';

const Secret = () => {
  return (target: unknown, propertyKey: string) => {
    Reflect.defineMetadata(
      `custom:isSecret:${propertyKey}`,
      true,
      target,
      propertyKey,
    );
  };
};

export { Secret };
