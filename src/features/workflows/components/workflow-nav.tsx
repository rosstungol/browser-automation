'use client'

import { Add01Icon, WorkflowSquare07Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTransition } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'
import { generateSlug } from '@/features/workflows/lib/generate-slug'
import type { Workflow } from '@/lib/db/schema'

function WorkflowList({ workflows }: { workflows: Workflow[] }) {
	return (
		<SidebarMenu>
			{workflows.length === 0 ? (
				<span className='px-3 py-2'>No workflows yet</span>
			) : (
				workflows.map((workflow) => (
					<SidebarMenuItem key={workflow.id}>
						<SidebarMenuButton>
							<span>{workflow.name}</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))
			)}
		</SidebarMenu>
	)
}

function AddWorkflowButton({
	createWorkflow,
}: {
	createWorkflow: (name: string) => Promise<void>
}) {
	const [pending, startTransition] = useTransition()

	return (
		<Button
			variant='ghost'
			size='icon-sm'
			aria-label='Add workflow'
			className='rounded-md'
			disabled={pending}
			onClick={() =>
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
			}
		>
			<HugeiconsIcon icon={Add01Icon} />
		</Button>
	)
}

function WorkflowNavHeader({
	createWorkflow,
}: {
	createWorkflow: (name: string) => Promise<void>
}) {
	return (
		<PopoverHeader className='flex-row items-center justify-between gap-0 px-2'>
			<PopoverTitle className='font-medium text-muted-foreground text-xs'>
				Workflows
			</PopoverTitle>
			<AddWorkflowButton createWorkflow={createWorkflow} />
		</PopoverHeader>
	)
}

export function WorkflowNav({
	workflows,
	createWorkflow,
}: {
	workflows: Workflow[]
	createWorkflow: (name: string) => Promise<void>
}) {
	const { state } = useSidebar()

	if (state === 'collapsed')
		return (
			<SidebarContent>
				<SidebarGroup>
					<Popover>
						<PopoverTrigger
							render={
								<SidebarMenuButton tooltip='Workflows'>
									<HugeiconsIcon icon={WorkflowSquare07Icon} />
									<span>Workflows</span>
								</SidebarMenuButton>
							}
						/>
						<PopoverContent
							side='right'
							align='start'
							className='w-64 gap-1 p-2'
						>
							<WorkflowNavHeader createWorkflow={createWorkflow} />
							<WorkflowList workflows={workflows} />
						</PopoverContent>
					</Popover>
				</SidebarGroup>
			</SidebarContent>
		)

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel className='items-center justify-between pr-0'>
					Workflows
					<AddWorkflowButton createWorkflow={createWorkflow} />
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<WorkflowList workflows={workflows} />
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	)
}

export { AddWorkflowButton, WorkflowList, WorkflowNavHeader }
