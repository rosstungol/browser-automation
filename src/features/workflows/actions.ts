'use server'

import { auth } from '@clerk/nextjs/server'
import { tasks } from '@trigger.dev/sdk'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createWorkflow, deleteWorkflow } from '@/features/workflows/data'
import { liveblocks } from '@/lib/liveblocks'
import type { helloWorldTask } from '@/trigger/example'

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

	await deleteWorkflow(workflowId, orgId)

	try {
		await liveblocks.deleteRoom(workflowId)
	} catch {
		// Room may already be gone or Liveblocks may be unreachable; the
		// workflow itself is already deleted, so don't fail the action.
	}

	revalidatePath('/', 'layout')
	redirect('/')
}

export async function runWorkflowAction(workflowId: string) {
	const { orgId } = await auth()
	if (!orgId) throw new Error('No active organization')

	const handle = await tasks.trigger<typeof helloWorldTask>('hello-world', {
		workflowId,
		orgId,
		message: 'Hello from right-sidebar',
	})

	return {
		runId: handle.id,
		publicAccessToken: handle.publicAccessToken,
	}
}
