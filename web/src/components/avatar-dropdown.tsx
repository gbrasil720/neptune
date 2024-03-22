import { LogOut, Settings } from 'lucide-react'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import type { NeptuneMain } from '@/@types'

export function AvatarDropdown({
	avatarFallback,
	avatarSrc,
}: NeptuneMain.AvatarDropdownProps) {
	const router = useRouter()
	const supabase = createClient()

	async function handleSignOut() {
		await supabase.auth.signOut()

		router.push('/sign-in')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={avatarSrc} />
					<AvatarFallback>{avatarFallback}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My account</DropdownMenuLabel>
				<DropdownMenuItem
					className="gap-2 hover:cursor-pointer"
					onClick={() => router.push('/dashboard/settings')}
				>
					<Settings className="size-4" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="text-red-500 gap-2 focus:underline focus:cursor-pointer focus:text-red-500"
					onClick={handleSignOut}
				>
					<LogOut className="size-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
