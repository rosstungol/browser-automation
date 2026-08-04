import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { createWorkflowAction } from '@/features/workflows/actions'
import { WorkflowNav } from '@/features/workflows/components/workflow-nav'
import type { Workflow } from '@/lib/db/schema'

export function AppSidebar({ workflows }: { workflows: Workflow[] }) {
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
