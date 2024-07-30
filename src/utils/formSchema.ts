import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string()
    .email({ message: "有効なメールアドレスを入力してください。" }),
  password: z.string().regex(/^[a-zA-Z0-9.?/-]{8,}$/, {
    message: "パスワードは、8文字以上で英数字を含めてください。",
  }),
});
