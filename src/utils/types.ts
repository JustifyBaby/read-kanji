import { SVGProps } from "react";
import z from "zod";

export type IconProps = SVGProps<SVGSVGElement>;

export type QueryParam = {
  searchParams: Promise<{ id: string }>;
};

export const ActionParamSchema = z.object({
  id: z.uuid(),
  raterId: z.string(),
});

export type ActionParam = z.infer<typeof ActionParamSchema>;

export type ZodErrorType = {
  issues: z.core.$ZodIssue[];
  name: string;
};

export type CreateAction = {
  status: "init" | "success" | "error";
  messages?: string[];
  redirectTo?: string;
};

export type AuthorInfo = {
  authorId: string;
  authorEmailName: string | null;
  authorIcon: string;
};
