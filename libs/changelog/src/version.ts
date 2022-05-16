const getVersionByIndex = (index: number): string => {
  const splitted = index.toString().split('');
  return `0.${splitted
    .map((c, i) => {
      if (index >= 10 ** ++i) {
        return '9';
      } else {
        return index
          .toString()
          .split('')
          .filter((x, v) => !(x === '0' && v === splitted.length - 1))
          .join('.');
      }
    })
    .join('.')}`;
};



export { getVersionByIndex };
