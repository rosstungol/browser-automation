export function setCookie(name: string, value: string, maxAge: number) {
	// biome-ignore lint/suspicious/noDocumentCookie: needed for server-aware client state
	document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`
}
