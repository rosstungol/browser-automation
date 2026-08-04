export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params

	return (
		<div className='flex flex-1 items-center justify-center'>
			<span className='font-mono text-muted-foreground text-sm'>{id}</span>
		</div>
	)
}
