import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { AvatarDropdown } from "../avatar-dropdown";
import { Separator } from "../ui/separator";
import { LanguageSelect } from "./language-select";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme-switcher";

export function Navbar() {
	async function test() {
		const supabase = createClient();
		await supabase.from("TeamManager").insert({
			name: "Guilherme",
			email: "resendebrasilgui@gmail.com",
		});
	}

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
				<button onClick={test}>TEST</button>
				<div className="flex space-x-6 items-center">
					<LanguageSelect />
					<Separator orientation="vertical" className="h-6" />
					<ModeToggle />
					<AvatarDropdown
						avatarSrc="https://github.com/gbrasil720.png"
						avatarFallback="GB"
					/>
				</div>
			</div>
			<Separator />
		</div>
	);
}
