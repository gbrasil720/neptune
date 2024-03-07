import Image from 'next/image'
import { NavLink } from './nav-link'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { ModeToggle } from './theme-switcher'

export function Navbar() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mx-auto container">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex space-x-2">
            <NavLink href="#">Dashboard</NavLink>
            <NavLink href="#">Users</NavLink>
          </div>
        </div>
        <div className="flex space-x-6">
          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/gbrasil720.png" />
            <AvatarFallback>GB</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Separator />
    </div>
  )
}
