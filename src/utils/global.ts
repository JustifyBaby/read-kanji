export const empty = <T>(str: string, emptiedValue: T) =>
  str === "" ? emptiedValue : str;

export const ITEMS_PER_PAGE = 6;
export const HEADER_HEIGHT = 100;

export const choice = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const ICON_DEFAULT_URL =
  "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1.png";

export const IS_DEV = process.env.NODE_ENV === "development";
