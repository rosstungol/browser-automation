import type { Edge } from '@xyflow/react'
import { describe, expect, it } from 'vitest'
import type { StepNodeType } from '../nodes/node-registry'
import { validateGraph } from './validate-graph'

function node(id: string, kind: 'trigger' | 'action'): StepNodeType {
	return {
		id,
		type: 'step',
		position: { x: 0, y: 0 },
		data: {
			type: kind === 'trigger' ? 'start' : 'open-url',
			kind,
			title: kind === 'trigger' ? 'Start' : `Action ${id}`,
			values: kind === 'action' ? { url: 'https://example.com' } : {},
		},
	}
}

function edge(source: string, target: string): Edge {
	return { id: `${source}-${target}`, source, target }
}

describe('validateGraph', () => {
	it('accepts a valid graph with a Start trigger and a reachable action', () => {
		const graph = {
			nodes: [node('start', 'trigger'), node('a', 'action')],
			edges: [edge('start', 'a')],
		}

		expect(validateGraph(graph)).toEqual([])
	})

	it('rejects an edge whose source is not a node', () => {
		const graph = {
			nodes: [node('start', 'trigger'), node('a', 'action')],
			edges: [edge('missing', 'a')],
		}

		expect(validateGraph(graph)).toEqual(
			expect.arrayContaining(['Edge from unknown node "missing".'])
		)
	})

	it('rejects an edge whose target is not a node', () => {
		const graph = {
			nodes: [node('start', 'trigger'), node('a', 'action')],
			edges: [edge('start', 'missing')],
		}

		expect(validateGraph(graph)).toEqual(
			expect.arrayContaining(['Edge to unknown node "missing".'])
		)
	})

	it('rejects duplicate node IDs', () => {
		const graph = {
			nodes: [
				node('start', 'trigger'),
				node('a', 'action'),
				node('a', 'action'),
			],
			edges: [edge('start', 'a')],
		}

		const problems = validateGraph(graph)
		expect(problems).toEqual(
			expect.arrayContaining(['Duplicate node ID "a" (found 2).'])
		)
	})

	it('rejects an action disconnected from the Start trigger in its own component', () => {
		const graph = {
			nodes: [
				node('start', 'trigger'),
				node('a', 'action'),
				node('b', 'action'),
			],
			edges: [edge('start', 'a')],
		}

		expect(validateGraph(graph)).toEqual(
			expect.arrayContaining([
				'Node "Action b" is not reachable from the Start trigger.',
			])
		)
	})

	it('rejects a disconnected Start trigger in a separate component', () => {
		const graph = {
			nodes: [node('start', 'trigger'), node('a', 'action')],
			edges: [edge('a', 'start')],
		}

		const problems = validateGraph(graph)
		expect(problems).toEqual(
			expect.arrayContaining([
				'Node "Action a" is not reachable from the Start trigger.',
			])
		)
	})

	it('still rejects cycles', () => {
		const graph = {
			nodes: [
				node('start', 'trigger'),
				node('a', 'action'),
				node('b', 'action'),
			],
			edges: [edge('start', 'a'), edge('a', 'b'), edge('b', 'a')],
		}

		expect(validateGraph(graph)).toEqual(
			expect.arrayContaining([
				'Workflow has a cycle — remove the loop before running.',
			])
		)
	})

	it('still rejects an empty edge list', () => {
		const graph = {
			nodes: [node('start', 'trigger'), node('a', 'action')],
			edges: [],
		}

		expect(validateGraph(graph)).toEqual(
			expect.arrayContaining(['Connect your nodes before running.'])
		)
	})
})
