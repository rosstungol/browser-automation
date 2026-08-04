import { auth } from '@clerk/nextjs/server'

import { AppSidebar } from '@/components/layout/app-sidebar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createWorkflowAction } from '@/features/workflows/actions'
import { listWorkflows } from '@/features/workflows/data'

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const { orgId } = await auth()
	const workflows = orgId ? await listWorkflows(orgId) : []

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='border'>
				<MobileNav
					className='absolute top-4 left-4 z-10'
					workflows={workflows}
					createWorkflow={createWorkflowAction}
				/>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
