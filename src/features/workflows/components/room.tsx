'use client'

import {
	ClientSideSuspense,
	LiveblocksProvider,
	RoomProvider,
} from '@liveblocks/react/suspense'
import type { ReactNode } from 'react'

import { Spinner } from '@/components/ui/spinner'

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
			authEndpoint='/api/liveblocks/auth'
			resolveUsers={async ({ userIds }) => {
				try {
					const response = await fetch('/api/liveblocks/users', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ userIds }),
					})

					if (!response.ok) {
						return undefined
					}

					return await response.json()
				} catch {
					return undefined
				}
			}}
		>
			<RoomProvider id={roomId}>
				<ClientSideSuspense
					fallback={
						<div className='flex h-full items-center justify-center'>
							<Spinner />
						</div>
					}
				>
					{children}
				</ClientSideSuspense>
			</RoomProvider>
		</LiveblocksProvider>
	)
}
