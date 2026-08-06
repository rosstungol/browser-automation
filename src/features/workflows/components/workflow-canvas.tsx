'use client'

import {
	addEdge,
	Background,
	type ColorMode,
	type Connection,
	ConnectionLineType,
	type Edge,
	type Node,
	ReactFlow,
	useEdgesState,
	useNodesState,
} from '@xyflow/react'
import { useTheme } from 'next-themes'
import { useCallback, useEffect, useState } from 'react'

import { ResizablePanel } from '@/components/ui/resizable'

const initialNodes: Node[] = [
	{ id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
	{ id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
]

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }]

export function WorkflowCanvas() {
	const { theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const colorMode: ColorMode = mounted && theme === 'dark' ? 'dark' : 'light'

	const [nodes, _setNodes, onNodesChange] = useNodesState(initialNodes)
	const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

	const onConnect = useCallback(
		(connection: Connection) => setEdges((edges) => addEdge(connection, edges)),
		[]
	)

	return (
		<ResizablePanel minSize='18rem'>
			<div className='h-full w-full'>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					fitView
					colorMode={colorMode}
					connectionLineType={ConnectionLineType.SmoothStep}
					connectionLineStyle={{ stroke: 'var(--border)' }}
					defaultEdgeOptions={{
						type: 'smoothstep',
						style: { stroke: 'var(--border)' },
					}}
					style={
						{
							background: 'var(--background)',
							'--xy-edge-stroke-default': 'var(--border)',
							'--xy-edge-stroke-width-default': 2,
							'--xy-connectionline-stroke-width-default': 2,
						} as React.CSSProperties
					}
				>
					<Background />
				</ReactFlow>
			</div>
		</ResizablePanel>
	)
}
