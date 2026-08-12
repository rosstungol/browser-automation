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
		<LiveblocksProvider throttle={16} authEndpoint='/api/liveblocks/auth'>
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
