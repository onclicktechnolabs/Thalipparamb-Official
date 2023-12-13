import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

console.log("ENTER MIDDLEWARE");
export default withAuth(
  function middleware(request) {
    console.log(request.nextUrl.pathname, "PATH NAME");
    console.log(request.nextauth.token.role, "ROLE");
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
  matcher: ["/admin/wellness"],
};
