import { and, desc, eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { workflows } from '@/lib/db/schema'

export async function deleteWorkflow(id: string, orgId: string) {
	const [deleted] = await db
		.delete(workflows)
		.where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
		.returning()

	return deleted
}

export async function getWorkflow(id: string, orgId: string) {
	const [workflow] = await db
		.select()
		.from(workflows)
		.where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))

	return workflow
}

export async function listWorkflows(orgId: string) {
	const workflowsList = await db
		.select()
		.from(workflows)
		.where(eq(workflows.orgId, orgId))
		.orderBy(desc(workflows.createdAt))

	return workflowsList
}

export async function createWorkflow(orgId: string, name: string) {
	const newWorkflow = await db
		.insert(workflows)
		.values({ orgId, name })
		.returning()

	return newWorkflow
}
