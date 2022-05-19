import { Transform } from 'class-transformer';

const UseDefault = (defaultConfig: unknown) => {
  return Transform(({ value, key }) =>
    value !== null && value !== undefined ? value : defaultConfig[key],
  );
};

export { UseDefault };
