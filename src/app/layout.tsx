import { ClerkProvider } from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import { Figtree, Geist_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={cn(
				'antialiased',
				fontMono.variable,
				'font-sans',
				figtree.variable
			)}
		>
			<body>
				<ClerkProvider
					appearance={{ theme: shadcn }}
					taskUrls={{
						'choose-organization': '/choose-organization',
					}}
				>
					<ThemeProvider>
						<TooltipProvider>
							{children}
							<Toaster />
						</TooltipProvider>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
