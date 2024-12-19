import { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export type QueryParam = {
  searchParams: Promise<{ id: string }>;
};

export type CreateAction = {
  status: "init" | "success" | "error";
  message?: string;
  redirectTo?: string;
};
