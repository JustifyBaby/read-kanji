import { SVGProps } from "react";
import { ZodIssue } from "zod";

export type IconProps = SVGProps<SVGSVGElement>;

export type QueryParam = {
  searchParams: Promise<{ id: string }>;
};

export type ZodErrorType = {
  issues: ZodIssue[];
  name: string;
};

export type CreateAction = {
  status: "init" | "success" | "error";
  messages?: string[];
  redirectTo?: string;
};
