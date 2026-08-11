import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'

import { Room } from '@/features/workflows/components/room'
import { WorkflowShell } from '@/features/workflows/components/workflow-shell'
import { getWorkflow } from '@/features/workflows/data'
import { isUuid } from '@/lib/utils'

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	if (!isUuid(id)) notFound()

	const { orgId } = await auth()
	const workflow = orgId ? await getWorkflow(id, orgId) : []

	if (workflow.length === 0) notFound()

	return (
		<Room roomId={id}>
			<WorkflowShell workflowId={id} />
		</Room>
	)
}
