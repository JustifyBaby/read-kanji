export const empty = <T>(str: string, emptiedValue: T) =>
  str === "" ? emptiedValue : str;

export const API_URL = "http://localhost:3000/api/posts";

export const choice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
