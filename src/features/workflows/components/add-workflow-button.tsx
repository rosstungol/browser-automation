'use client'

import { Add01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { generateSlug } from '@/features/workflows/lib/generate-slug'

export function AddWorkflowButton({
	createWorkflow,
	variant = 'icon',
}: {
	createWorkflow: (name: string) => Promise<void>
	variant?: 'icon' | 'text'
}) {
	const [pending, startTransition] = useTransition()

	const handleClick = () =>
		startTransition(async () => {
			try {
				await createWorkflow(generateSlug())
			} catch (error) {
				if (
					String(
						(error as { digest?: string } | null)?.digest ?? ''
					).startsWith('NEXT_REDIRECT')
				)
					throw error
				toast.error('Could not create workflow')
			}
		})

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
