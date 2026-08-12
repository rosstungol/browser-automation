import { auth, currentUser } from '@clerk/nextjs/server'

import { liveblocks } from '@/lib/liveblocks'

export async function POST() {
	const { userId, orgId } = await auth()

	if (!userId) {
		return new Response('Unauthorized', { status: 401 })
	}

	if (!orgId) {
		return new Response('No active organization', { status: 403 })
	}

	const user = await currentUser()

	if (!user) {
		return new Response('Unauthorized', { status: 401 })
	}

	const { status, body } = await liveblocks.identifyUser(
		{
			userId,
			groupIds: [orgId],
			organizationId: orgId,
		},
		{
			userInfo: {
				name: user?.fullName ?? user?.username ?? 'Anonymous',
				avatar: user?.imageUrl,
			},
		}
	)

	return new Response(body, { status })
}
