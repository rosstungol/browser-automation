'use client'

import { Add01Icon, WorkflowSquare07Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

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

const workflows = [
	'Welcome Workflow',
	'Morning Scraper',
	'Nightly Report',
	'Data Sync',
	'Approval Flow',
	'Cleanup Task',
]

function WorkflowList() {
	return (
		<SidebarMenu>
			{workflows.map((workflow) => (
				<SidebarMenuItem key={workflow}>
					<SidebarMenuButton>
						<span>{workflow}</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	)
}

function AddWorkflowButton() {
	return (
		<Button
			variant='ghost'
			size='icon-sm'
			aria-label='Add workflow'
			className='rounded-md'
		>
			<HugeiconsIcon icon={Add01Icon} />
		</Button>
	)
}

export function WorkflowNav() {
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
							<PopoverHeader className='flex-row items-center justify-between gap-0 px-2'>
								<PopoverTitle className='font-medium text-muted-foreground text-xs'>
									Workflows
								</PopoverTitle>
								<AddWorkflowButton />
							</PopoverHeader>
							<WorkflowList />
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
					<AddWorkflowButton />
				</SidebarGroupLabel>
				<SidebarGroupContent>
					<WorkflowList />
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	)
}
