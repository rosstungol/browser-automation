'use client'

import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
	WorkflowList,
	WorkflowNavHeader,
} from '@/features/workflows/components/workflow-nav'
import type { Workflow } from '@/lib/db/schema'
import { cn } from '@/lib/utils'

export function MobileNav({
	className,
	workflows,
	createWorkflow,
}: {
	className?: string
	workflows: Workflow[]
	createWorkflow: (name: string) => Promise<void>
}) {
	return (
		<div className={cn('md:hidden', className)}>
			<Popover>
				<PopoverTrigger
					render={
						<Button
							variant='ghost'
							size='icon-sm'
							aria-label='Open navigation menu'
						>
							<HugeiconsIcon icon={Menu01Icon} />
						</Button>
					}
				/>
				<PopoverContent
					side='bottom'
					align='start'
					className='max-h-[80vh] w-72 gap-1 overflow-y-auto p-2'
				>
					<div className='flex justify-between gap-3 p-3'>
						<OrganizationSwitcher hidePersonal />
						<UserButton />
					</div>
					<Separator />
					<WorkflowNavHeader createWorkflow={createWorkflow} />
					<WorkflowList workflows={workflows} />
				</PopoverContent>
			</Popover>
		</div>
	)
}
