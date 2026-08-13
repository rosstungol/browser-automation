import { HugeiconsIcon } from '@hugeicons/react'
import { Handle, type NodeProps, Position } from '@xyflow/react'
import { memo } from 'react'
import { cn } from '@/lib/utils'
import { nodeRegistry, type StepNodeType } from '../nodes/node-registry'

function StepNodeComponent({ data, selected }: NodeProps<StepNodeType>) {
	const { type, kind, title, values } = data
	const def = nodeRegistry[type]
	const fields = def.fields.filter((field) => values[field.key])

	// A trigger starts the flow and takes no input, so it has no target handle.
	const hasTarget = kind !== 'trigger'

	return (
		<div
			className={cn(
				'min-w-50 max-w-80 rounded-(--radius) border-2 border-border bg-card text-card-foreground',
				selected && 'ring-2 ring-ring ring-offset-2 ring-offset-background'
			)}
		>
			{hasTarget && (
				<Handle
					type='target'
					position={Position.Left}
					style={{ transform: 'translate(-100%, -50%)' }}
					className='h-3.5! w-1.5! min-w-0! rounded-r-none! rounded-l-xs! border-0! bg-border!'
				/>
			)}

			<div className='flex items-center gap-2.5 px-3 py-2.5'>
				<div
					className={cn(
						'flex size-7 shrink-0 items-center justify-center rounded-md',
						def.accent
					)}
				>
					<HugeiconsIcon icon={def.icon} size={16} />
				</div>
				<span className='font-semibold text-sm'>{title}</span>
			</div>

			{fields.length > 0 && (
				<>
					<div className='border-border border-t' />
					<div className='flex flex-col gap-1.5 px-3 py-2.5'>
						{fields.map((field) => (
							<div
								key={field.key}
								className='flex items-center justify-between gap-4 text-xs'
							>
								<span className='shrink-0 text-muted-foreground'>
									{field.label}
								</span>
								<span className='truncate font-medium'>
									{values[field.key]}
								</span>
							</div>
						))}
					</div>
				</>
			)}

			<Handle
				type='source'
				position={Position.Right}
				style={{ transform: 'translate(100%, -50%)' }}
				className='h-3.5! w-1.5! min-w-0! rounded-r-xs! rounded-l-none! border-0! bg-border!'
			/>
		</div>
	)
}

export const StepNode = memo(StepNodeComponent)
