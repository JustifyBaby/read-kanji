import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/", "/policy", "/rule"]);

export const matchWithQuery = (req: NextRequest) => {
  const { url } = req;

  try {
    // `createRouteMatcher`で基本のパスをマッチング
    const isPathMatched = isProtectedRoute(req);
    if (isPathMatched) return true;

    // URLをパースしてクエリパラメータを取得
    const { searchParams } = req.nextUrl; // new URL(url, process.env.NEXT_PUBLIC_ORIGIN); // ダミーのベースURLを追加

    // 特定のクエリパラメータを検証
    return searchParams.get("id") === "0";
  } catch (error) {
    console.error("Invalid URL:", url, error);
    return false; // URLの形式が不正な場合はfalse
  }
};

export default clerkMiddleware(async (auth, req) => {
  if (req.url === process.env.NEXT_PUBLIC_DOMAIN)
    return NextResponse.redirect(new URL("/?id=0", req.url));

  if (!matchWithQuery(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
