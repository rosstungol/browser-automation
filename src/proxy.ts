import { clerkMiddleware } from '@clerk/nextjs/server'

const PUBLIC_ROUTES = ['/sign-in', '/sign-up']

export default clerkMiddleware(async (auth, request) => {
	if (!PUBLIC_ROUTES.some((route) => request.nextUrl.pathname.startsWith(route))) {
		await auth.protect()
	}
})

export const config = {
	matcher: [
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		'/(api|trpc)(.*)',
	],
}
