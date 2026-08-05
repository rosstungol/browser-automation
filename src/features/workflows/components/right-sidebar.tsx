'use client'

import { PlayIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useRealtimeRun } from '@trigger.dev/react-hooks'
import { useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { runWorkflowAction } from '@/features/workflows/actions'
import type { helloWorldTask } from '@/trigger/example'

type RunHandle = {
	runId: string
	publicAccessToken: string
}

export function RightSidebar({ workflowId }: { workflowId: string }) {
	const [run, setRun] = useState<RunHandle | null>(null)
	const [pending, startTransition] = useTransition()

	const { run: liveRun, error: realtimeError } = useRealtimeRun<
		typeof helloWorldTask
	>(run?.runId ?? '', {
		accessToken: run?.publicAccessToken ?? '',
		enabled: !!run,
		skipColumns: ['payload'],
	})

	const handleClick = () => {
		startTransition(async () => {
			const result = await runWorkflowAction(workflowId)
			setRun(result)
		})
	}

	const status = liveRun?.metadata?.status as string | undefined
	const isRunning = ['QUEUED', 'EXECUTING', 'DELAYED'].includes(
		liveRun?.status ?? ''
	)

	return (
		<div className='flex size-full flex-col gap-4 p-4'>
			<Button variant='default' onClick={handleClick} disabled={pending}>
				<HugeiconsIcon icon={PlayIcon} />
				Run
			</Button>

			{realtimeError && (
				<p className='text-red-500 text-sm'>{realtimeError.message}</p>
			)}

			{run && (
				<div className='flex flex-col gap-2 text-sm'>
					<div className='flex items-center gap-2'>
						<span className='text-muted-foreground'>Status:</span>
						{isRunning ? 'Running' : String(liveRun?.status ?? 'Queued')}
					</div>

					{status && (
						<div className='flex items-center gap-2'>
							<span className='text-muted-foreground'>Phase:</span>
							<span className='capitalize'>{status}</span>
						</div>
					)}

					{liveRun?.output && (
						<div className='flex items-center gap-2'>
							<span className='text-muted-foreground'>Output:</span>
							<span>{liveRun.output.message}</span>
						</div>
					)}
				</div>
			)}
		</div>
	)
}
