'use client'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { RightSidebar } from './right-sidebar'
import { WorkflowCanvas } from './workflow-canvas'

export function WorkflowShell({ workflowId }: { workflowId: string }) {
	return (
		<ResizablePanelGroup orientation='horizontal' className='size-full'>
			<ResizablePanel minSize='30rem'>
				<ResizablePanelGroup orientation='vertical'>
					<WorkflowCanvas />
					<ResizableHandle />
					<ResizablePanel defaultSize='8rem' minSize='6rem'>
						<span className='flex h-full items-center justify-center text-muted-foreground text-sm'>
							Logs
						</span>
					</ResizablePanel>
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize='16rem' minSize='14rem' maxSize='36rem'>
				<RightSidebar workflowId={workflowId} />
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
