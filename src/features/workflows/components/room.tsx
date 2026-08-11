'use client'

import {
	ClientSideSuspense,
	LiveblocksProvider,
	RoomProvider,
} from '@liveblocks/react/suspense'
import type { ReactNode } from 'react'

export function Room({
	roomId,
	children,
}: {
	roomId: string
	children: ReactNode
}) {
	return (
		<LiveblocksProvider
			throttle={16}
			// TODO: Replace Public Key on Liveblocks auth implementation
			// biome-ignore lint/style/noNonNullAssertion: to be replaced on liveblocks auth implementation
			publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!}
		>
			<RoomProvider id={roomId}>
				<ClientSideSuspense fallback={<div>Loading…</div>}>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
