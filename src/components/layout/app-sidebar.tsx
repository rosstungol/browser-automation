import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { createWorkflowAction } from '@/features/workflows/actions'
import { WorkflowNav } from '@/features/workflows/components/workflow-nav'
import { listWorkflows } from '@/features/workflows/data'

export async function AppSidebar() {
	const { orgId } = await auth()
	const workflows = orgId ? await listWorkflows(orgId) : []

	return (
		<Sidebar variant='inset' collapsible='icon' className='py-4 md:mx-1'>
			<SidebarHeader className='group-data-[collapsible=icon]:justify-center! flex-row items-center justify-between gap-2'>
				<OrganizationSwitcher
					hidePersonal
					appearance={{
						elements: {
							rootBox: 'min-w-0 group-data-[collapsible=icon]:!hidden',
						},
					}}
				/>
				<SidebarTrigger />
			</SidebarHeader>
			<WorkflowNav
				workflows={workflows}
				createWorkflow={createWorkflowAction}
			/>
			<SidebarFooter className='mx-0.75'>
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
