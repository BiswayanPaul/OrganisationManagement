import { auth } from "./auth";
import {
    DEFAUL_LOGIN_REDIRECT,
    apiAuthPrefix,
    publicRoutes,
    authRoutes
} from "@/routes";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoutes) {
        return;  // Don't return `null`, return `undefined` (i.e., no response needed)
    }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAUL_LOGIN_REDIRECT, nextUrl));
        }
        return;  // Same here, avoid `null`
    }

    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL("/auth/signin", nextUrl));
    }

    return;  // Ensure `undefined` is returned by default
});

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)'
    ]
};
