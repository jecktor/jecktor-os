export const shuffle = (arr: any[]) => {
  const a = arr.slice();

  for (let i = a.length - 1; i > 0; --i) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
};

export const sleep = (ms: number) =>
  new Promise<undefined>(resolve => setTimeout(resolve, ms));
