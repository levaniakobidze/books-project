import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect("http://localhost:3000" + "/auth/login"!);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my_books"],
};
