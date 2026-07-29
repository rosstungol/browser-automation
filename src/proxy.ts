import { clerkMiddleware } from '@clerk/nextjs/server'

const PUBLIC_ROUTES = ['/sign-in', '/sign-up']

export default clerkMiddleware(async (auth, request) => {
	const { pathname } = request.nextUrl

	if (pathname === '/choose-organization') {
		return
	}

	if (!PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`))) {
		await auth.protect()
	}
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
}
