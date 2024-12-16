import { z } from "zod";

export const formSchema = z.object({
  kanji: z.string().min(2, "開発側の問題です。").max(4, "開発側の問題です。"),
  author: z.string().min(2, "名前は2文字以上にしてください"),
  read: z.string().min(1, "漢字を読んでください"),
});
