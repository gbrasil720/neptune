import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { AvatarDropdown } from "../avatar-dropdown";
import { Separator } from "../ui/separator";
import { LanguageSelect } from "./language-select";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme-switcher";
import { useEffect, useState } from "react";

export function Navbar() {
  const [avatar, setAvatar] = useState("");

  async function getAvatar() {
    const supabase = createClient();

    const { data } = await supabase.auth.getSession();
    const avatar =
      data.session?.user.identities?.[0]?.identity_data?.avatar_url;

    setAvatar(avatar);
  }

  useEffect(() => {
    getAvatar();
  });

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
        <div className="flex space-x-6 items-center">
          <LanguageSelect />
          <Separator orientation="vertical" className="h-6" />
          <ModeToggle />
          <AvatarDropdown avatarSrc={avatar} avatarFallback="GB" />
        </div>
      </div>
      <Separator />
    </div>
  );
}
