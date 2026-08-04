import { FileNotFoundIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'

export default function NotFound() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>
					<HugeiconsIcon icon={FileNotFoundIcon} />
				</EmptyMedia>
				<EmptyTitle>Workflow not found</EmptyTitle>
				<EmptyDescription>
					The workflow you&apos;re looking for doesn&apos;t exist or has been
					deleted.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					nativeButton={false}
					render={<Link href='/'>Back to workflows</Link>}
				/>
			</EmptyContent>
		</Empty>
	)
}
