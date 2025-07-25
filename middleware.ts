import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // You can perform role-based checks here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if user is logged in
        return !!token;
      },
    },
  }
);

// Match only protected routes
export const config = {
  matcher: ["/", "/dashboard", "/beat/:path*"],
};
