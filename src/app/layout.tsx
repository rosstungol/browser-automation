import {
	ClerkProvider,
	Show,
	SignInButton,
	SignUpButton,
	UserButton,
} from '@clerk/nextjs'
import { shadcn } from '@clerk/ui/themes'
import { Figtree, Geist_Mono } from 'next/font/google'

import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
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
				<ClerkProvider appearance={{ theme: shadcn }}>
					<header className='flex justify-end gap-2 p-4'>
						<Show when='signed-out'>
							<SignInButton mode='modal'>
								<Button variant='ghost' size='sm'>
									Sign in
								</Button>
							</SignInButton>
							<SignUpButton mode='modal'>
								<Button variant='ghost' size='sm'>
									Sign up
								</Button>
							</SignUpButton>
						</Show>
						<Show when='signed-in'>
							<UserButton />
						</Show>
					</header>
					<ThemeProvider>
						{children}
						<Toaster />
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	)
}
