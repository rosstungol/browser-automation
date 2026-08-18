'use server'

import { auth } from '@clerk/nextjs/server'
import { runs, tasks } from '@trigger.dev/sdk'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import {
	createWorkflow,
	deleteWorkflow,
	saveWorkflowGraph,
} from '@/features/workflows/data'
import type { WorkflowGraph } from '@/lib/db/schema'
import { liveblocks } from '@/lib/liveblocks'
import type { runWorkflowTask } from './tasks/run-workflow'

export async function createWorkflowAction(name: string) {
	const { orgId } = await auth()
	if (!orgId) throw new Error('No active organization')

	const [workflow] = await createWorkflow(orgId, name)

	revalidatePath('/', 'layout')
	redirect(`/workflows/${workflow.id}`)
}

export async function deleteWorkflowAction(workflowId: string) {
	const { orgId } = await auth()
	if (!orgId) throw new Error('No active organization')

	const deleted = await deleteWorkflow(workflowId, orgId)

	if (deleted) {
		try {
			await liveblocks.deleteRoom(workflowId)
		} catch {
			// Room may already be gone or Liveblocks may be unreachable; the
			// workflow itself is already deleted, so don't fail the action.
		}
	}

	revalidatePath('/', 'layout')
	redirect('/')
}

export async function runWorkflowAction({
	id,
	graph,
}: {
	id: string
	graph: WorkflowGraph
}) {
	const { orgId } = await auth()

	if (!orgId) throw new Error('No active organization')

	await saveWorkflowGraph({ orgId, id, graph })

	const handle = await tasks.trigger<typeof runWorkflowTask>(
		'run-workflow',
		{ workflowId: id, orgId },
		{ tags: [`workflow: ${id}`] }
	)

	return handle
}

export async function cancelWorkflowRunAction(runId: string) {
	const { orgId } = await auth()

	if (!orgId) throw new Error('No active organization')

	await runs.cancel(runId)
}
