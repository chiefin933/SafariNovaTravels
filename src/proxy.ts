import { clerkMiddleware, createRouteMatcher, createClerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/destinations(.*)',
  '/packages(.*)',
  '/blog(.*)',
  '/about',
  '/contact',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/api/seed'
]);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) {
    console.log(`[Middleware] Admin route detected: ${request.nextUrl.pathname}`);
    const { userId } = await auth();
    
    if (!userId) {
      console.log("[Middleware] No userId, redirecting to /sign-in");
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    const user = await clerkClient.users.getUser(userId);
    console.log(`[Middleware] User: ${user.emailAddresses[0].emailAddress}, Role: ${user.publicMetadata?.role}`);
    
    if (user.publicMetadata?.role !== 'ADMIN') {
      console.log("[Middleware] Access denied, redirecting to home");
      return NextResponse.redirect(new URL('/', request.url));
    }
    console.log("[Middleware] Access granted");
  }


  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
