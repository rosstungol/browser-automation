import { auth } from '@clerk/nextjs/server'
import { WorkflowSquare07Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { MobileNav } from '@/components/layout/mobile-nav'
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
import { listWorkflows } from '@/features/workflows/data'

export default async function Page() {
	await auth.protect()

	const { orgId } = await auth()
	const workflows = orgId ? await listWorkflows(orgId) : []

	return (
		<div className='relative flex flex-1 flex-col'>
			<MobileNav
				className='absolute top-4 left-4'
				workflows={workflows}
				createWorkflow={createWorkflowAction}
			/>
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
