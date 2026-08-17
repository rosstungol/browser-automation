import toposort from 'toposort'

import type { WorkflowGraph } from '@/lib/db/schema'
import type { StepNodeType } from '../nodes/node-registry'

export function validateGraph({ nodes, edges }: WorkflowGraph): string[] {
	const problems: string[] = []

	const triggers = nodes.filter((n) => n.data.kind === 'trigger').length
	if (triggers !== 1) {
		problems.push(
			`A workflow needs exactly one Start trigger (found ${triggers}).`
		)
	}

	const nodeIds = new Set(nodes.map((n) => n.id))

	for (const edge of edges) {
		if (!nodeIds.has(edge.source)) {
			problems.push(`Edge from unknown node "${edge.source}".`)
		}
		if (!nodeIds.has(edge.target)) {
			problems.push(`Edge to unknown node "${edge.target}".`)
		}
	}

	if (edges.length === 0) {
		problems.push('Connect your nodes before running.')
	} else {
		try {
			toposort(edges.map((e) => [e.source, e.target]))
		} catch {
			problems.push('Workflow has a cycle — remove the loop before running.')
		}
	}

	// Every non-trigger node must be reachable from the single Start trigger.
	if (triggers === 1) {
		const start = nodes.find((n) => n.data.kind === 'trigger') as
			| StepNodeType
			| undefined
		if (!start) return problems

		const adjacency = new Map(nodes.map((n) => [n.id, [] as string[]]))
		for (const edge of edges) {
			adjacency.get(edge.source)?.push(edge.target)
		}

		const reachable = new Set<string>([start.id])
		const queue = [start.id]
		for (let i = 0; i < queue.length; i++) {
			const current = queue[i]
			for (const next of adjacency.get(current) ?? []) {
				if (!reachable.has(next)) {
					reachable.add(next)
					queue.push(next)
				}
			}
		}

		for (const node of nodes) {
			if (node.data.kind === 'trigger') continue
			if (!reachable.has(node.id)) {
				problems.push(
					`Node "${node.data.title}" is not reachable from the Start trigger.`
				)
			}
		}
	}

	return problems
}
