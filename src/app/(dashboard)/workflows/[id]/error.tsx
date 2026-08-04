'use client'

import { Alert01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'

// biome-ignore lint/suspicious/noShadowRestrictedNames: required by the error.js convention
export default function Error({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string }
	unstable_retry: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<HugeiconsIcon icon={Alert01Icon} />
				</EmptyMedia>
				<EmptyTitle>Something went wrong</EmptyTitle>
				<EmptyDescription>
					An unexpected error occurred while loading this workflow.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button onClick={unstable_retry}>Try again</Button>
			</EmptyContent>
		</Empty>
	)
}
