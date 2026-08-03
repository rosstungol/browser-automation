'use client'

import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	releaseCreateWorkflowLock,
	tryAcquireCreateWorkflowLock,
	useCreateWorkflowInFlight,
} from '@/features/workflows/lib/create-workflow-lock'
import { generateSlug } from '@/features/workflows/lib/generate-slug'

export function AddWorkflowButton({
	createWorkflow,
	variant = 'icon',
}: {
	createWorkflow: (name: string) => Promise<void>
	variant?: 'icon' | 'text'
}) {
	const pending = useCreateWorkflowInFlight()

	const handleClick = async () => {
		if (!tryAcquireCreateWorkflowLock()) return
		try {
			await createWorkflow(generateSlug())
		} catch (error) {
			if (
				String((error as { digest?: string } | null)?.digest ?? '').startsWith(
					'NEXT_REDIRECT'
				)
			)
				throw error
			toast.error('Could not create workflow')
		} finally {
			releaseCreateWorkflowLock()
		}
	}

	if (variant === 'text')
		return (
			<Button disabled={pending} onClick={handleClick}>
				New workflow
				<HugeiconsIcon icon={Add01Icon} />
			</Button>
		)

	return (
		<Button
			variant='ghost'
			size='icon-sm'
			aria-label='Add workflow'
			className='rounded-md'
			disabled={pending}
			onClick={handleClick}
		>
			<HugeiconsIcon icon={Add01Icon} />
		</Button>
	)
}
