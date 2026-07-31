export function setCookie(name: string, value: string, maxAge: number) {
	const secure = window.location.protocol === 'https:' ? '; Secure' : ''
	// biome-ignore lint/suspicious/noDocumentCookie: needed for server-aware client state
	document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`
}
