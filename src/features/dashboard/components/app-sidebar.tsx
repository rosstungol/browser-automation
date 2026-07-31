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
			<WorkflowNav />
			<SidebarFooter className='mx-0.75'>
				<UserButton />
			</SidebarFooter>
		</Sidebar>
	)
}
