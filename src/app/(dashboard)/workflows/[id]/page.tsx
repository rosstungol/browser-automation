import { auth } from '@clerk/nextjs/server'
import { ReactFlowProvider } from '@xyflow/react'
import { notFound } from 'next/navigation'

import { Room } from '@/features/workflows/components/room'
import { WorkflowShell } from '@/features/workflows/components/workflow-shell'
import { getWorkflow } from '@/features/workflows/data'
import { liveblocks } from '@/lib/liveblocks'
import { isUuid } from '@/lib/utils'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	if (!isUuid(id)) notFound()

	const { orgId } = await auth()
	if (!orgId) notFound()

	const workflow = await getWorkflow(id, orgId)
	if (!workflow) notFound()

	await liveblocks.getOrCreateRoom(id, {
		organizationId: orgId,
		defaultAccesses: [],
		groupsAccesses: {
			[orgId]: ['room:write'],
		},
		metadata: {
			title: workflow.name,
		},
	})

	return (
		<Room roomId={id}>
			<ReactFlowProvider>
				<WorkflowShell workflowId={id} />
			</ReactFlowProvider>
		</Room>
	)
}
