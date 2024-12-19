export const empty = <T>(str: string, emptiedValue: T) =>
  str === "" ? emptiedValue : str;

export const ITEMS_PER_PAGE = 6;

export const choice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
