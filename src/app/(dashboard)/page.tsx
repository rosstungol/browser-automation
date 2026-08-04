import { auth } from '@clerk/nextjs/server'
import { WorkflowSquare07Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import { createWorkflowAction } from '@/features/workflows/actions'
import { AddWorkflowButton } from '@/features/workflows/components/workflow-nav'

export default async function Page() {
	await auth.protect()

	return (
		<div className='relative flex flex-1 flex-col'>
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant='icon'>
						<HugeiconsIcon icon={WorkflowSquare07Icon} />
					</EmptyMedia>
					<EmptyTitle>No workflows selected</EmptyTitle>
					<EmptyDescription>
						Create your first workflow or select a workflow from the sidebar to
						get started.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<AddWorkflowButton
						variant='text'
						createWorkflow={createWorkflowAction}
					/>
				</EmptyContent>
			</Empty>
		</div>
	)
}
