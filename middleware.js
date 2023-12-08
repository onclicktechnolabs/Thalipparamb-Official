import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

console.log("ENTER MIDDLEWARE");
export default withAuth(
  function middleware(request) {
    console.log(
      "🚀 ~ file: middleware.js:6 ~ middleware ~ req:",
      request.nextUrl.pathname
    );
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      request.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/404", request.url));
    }
    return NextResponse;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin"],
};
