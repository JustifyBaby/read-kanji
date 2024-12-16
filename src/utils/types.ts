import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export type AuthMsg = {
  email: string;
  password: string;
};

export type RouteParam = {
  params: {
    id: string;
  };
};

export type CreateAction = {
  status: "init" | "success" | "error";
  message?: string;
  redirectTo?: string;
};
