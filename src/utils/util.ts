export const uniq = <T>(arr: T[]) => {
  const result: T[] = [];

  arr.forEach((el) => {
    if (result.indexOf(el) === -1) {
      result.push(el);
    }
  });

  return result;
};
