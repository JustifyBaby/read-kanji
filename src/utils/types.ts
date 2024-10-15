import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

type AuthMsg = {
  email: string;
  password: string;
};

type UserRead = {
  id?: number;
  author: string;
  authorId: string;
  kanji: string;
  read: string;
  highRater?: string[];
  createdAt?: Date;
};

type RouteParam = {
  params: {
    id: string;
  };
};

export type { IconProps, AuthMsg, UserRead, RouteParam };
