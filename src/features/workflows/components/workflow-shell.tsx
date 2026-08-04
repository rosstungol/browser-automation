'use client'

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'

export function WorkflowShell({ workflowId }: { workflowId: string }) {
	void workflowId
	return (
		<ResizablePanelGroup orientation='horizontal' className='size-full'>
			<ResizablePanel minSize='30rem'>
				<ResizablePanelGroup orientation='vertical'>
					<ResizablePanel minSize='18rem'>
						<span className='flex h-full items-center justify-center text-muted-foreground text-sm'>
							Canvas
						</span>
					</ResizablePanel>
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
				<span className='flex h-full items-center justify-center text-muted-foreground text-sm'>
					Inspector
				</span>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}
