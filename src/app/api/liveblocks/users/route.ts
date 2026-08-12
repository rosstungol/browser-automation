import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

type UserDisplayInfo = Liveblocks['UserMeta']['info']

export async function POST(request: Request) {
	const { userId, orgId } = await auth()

	if (!userId) {
		return new Response('Unauthorized', { status: 401 })
	}

	if (!orgId) {
		return new Response('No active organization', { status: 403 })
	}

	let userIds: string[]
	try {
		const body = (await request.json()) as { userIds?: unknown }
		if (
			!Array.isArray(body.userIds) ||
			body.userIds.some((id) => typeof id !== 'string')
		) {
			return new Response('Invalid request body', { status: 400 })
		}
		userIds = body.userIds
	} catch {
		return new Response('Invalid request body', { status: 400 })
	}

	if (userIds.length === 0) {
		return NextResponse.json([])
	}

	const client = await clerkClient()
	const { data: users } = await client.users.getUserList({
		userId: userIds,
		organizationId: [orgId],
	})

	const userInfoById = new Map<string, UserDisplayInfo>()
	for (const user of users) {
		userInfoById.set(user.id, {
			name: user.fullName ?? user.username ?? 'Anonymous',
			avatar: user.imageUrl,
		})
	}

	const result: (UserDisplayInfo | null)[] = userIds.map(
		(id) => userInfoById.get(id) ?? null
	)

	return NextResponse.json(result)
}
