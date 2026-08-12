import { Liveblocks } from '@liveblocks/node'

export const liveblocks = new Liveblocks({
	// biome-ignore lint/style/noNonNullAssertion: set via env, required to boot the client
	secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})
