import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'

import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { WorkflowNav } from '@/features/dashboard/components/workflow-nav'

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
			<WorkflowNav />
			<SidebarFooter>
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
