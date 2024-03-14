import { LogOut, Settings } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface AvatarDropdownProps {
	avatarSrc: string
	avatarFallback: string
}

export function AvatarDropdown({
	avatarFallback,
	avatarSrc,
}: AvatarDropdownProps) {
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
				<DropdownMenuItem className="gap-2 hover:cursor-pointer">
					<Settings className="size-4" />
					Settings
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="text-red-500 gap-2 focus:underline focus:cursor-pointer focus:text-red-500">
					<LogOut className="size-4" />
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
