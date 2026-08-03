import { AppSidebar } from '@/components/layout/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset className='border'>{children}</SidebarInset>
		</SidebarProvider>
	)
}
