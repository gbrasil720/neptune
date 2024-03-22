import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/button'
import type { NeptuneMain } from '@/@types'

export function SidebarNav({
	className,
	items,
	...props
}: NeptuneMain.SidebarNavProps) {
	const pathname = usePathname()

	return (
		<nav
			className={cn(
				'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1 container mx-auto py-10 space-y-10',
				className
			)}
			{...props}
		>
			{items.map((item) => (
				<Link
					key={item.href}
					href={item.href}
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						pathname === item.href
							? 'bg-muted hover:bg-muted'
							: 'hover:bg-transparent hover:underline',
						'justify-start'
					)}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}
