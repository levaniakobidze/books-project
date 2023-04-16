import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname);

  const jwt = req.cookies.has("jwt");
  console.log(jwt);

  if (!jwt) {
    return NextResponse.redirect("http://localhost:3000/auth/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/my_books", "/categories"],
};
