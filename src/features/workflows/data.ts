import { and, desc, eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { type WorkflowGraph, workflows } from '@/lib/db/schema'
import { validateGraph } from './lib/validate-graph'

export async function saveWorkflowGraph({
	orgId,
	id,
	graph,
}: {
	orgId: string
	id: string
	graph: WorkflowGraph
}) {
	const problems = validateGraph(graph)

	if (problems.length > 0) throw new Error(problems.join(' '))

	await db
		.update(workflows)
		.set({ graph, updatedAt: new Date() })
		.where(and(eq(workflows.id, id), eq(workflows.orgId, orgId)))
}

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
