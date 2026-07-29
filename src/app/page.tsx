import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

export default async function Page() {
	await auth.protect()

	return (
		<div className='flex gap-4 p-8'>
			<UserButton />
			<OrganizationSwitcher />
		</div>
	)
}
