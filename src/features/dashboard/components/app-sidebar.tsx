'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { WorkflowSquare07Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from '@/components/ui/sidebar'

const workflows = [
	{ name: 'Welcome Workflow', icon: WorkflowSquare07Icon },
	{ name: 'Morning Scraper', icon: WorkflowSquare07Icon },
	{ name: 'Nightly Report', icon: WorkflowSquare07Icon },
	{ name: 'Data Sync', icon: WorkflowSquare07Icon },
	{ name: 'Approval Flow', icon: WorkflowSquare07Icon },
	{ name: 'Cleanup Task', icon: WorkflowSquare07Icon },
]

export function AppSidebar() {
	return (
		<Sidebar variant='inset' collapsible='icon' className='mx-1 py-4'>
			<SidebarHeader className='group-data-[collapsible=icon]:justify-center! flex-row items-center justify-between gap-2'>
				<OrganizationSwitcher
					hidePersonal
					appearance={{
						elements: {
							rootBox: 'min-w-0 group-data-[collapsible=icon]:!hidden',
							organizationSwitcherTrigger: 'w-full justify-between',
						},
					}}
				/>
				<SidebarTrigger />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workflows</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{workflows.map((workflow) => (
								<SidebarMenuItem key={workflow.name}>
									<SidebarMenuButton tooltip={workflow.name}>
										<HugeiconsIcon icon={workflow.icon} />
										<span>{workflow.name}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className='mx-0.5'>
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
