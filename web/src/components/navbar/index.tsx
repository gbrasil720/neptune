"use client";

import Image from "next/image";
import { AvatarDropdown } from "../avatar-dropdown";
import { Separator } from "../ui/separator";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme-switcher";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CreateTeamDialog } from "../dialog/create-team-dialog";
import { getSessionInfos } from "@/utils/getSessionInfos";

export function Navbar() {
  const [avatar, setAvatar] = useState<string>("");
  const router = useRouter();

  async function getAvatar() {
    const { avatar } = await getSessionInfos();

    setAvatar(avatar);
  }

  useEffect(() => {
    getAvatar();
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mx-auto container">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={50}
            height={50}
            onClick={() => router.push("/dashboard")}
            className="hover:cursor-pointer"
          />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex space-x-2">
            <NavLink href="/dashboard">Dashboard</NavLink>
            <NavLink href="/dashboard/settings">Settings</NavLink>
          </div>
        </div>
        <div className="flex space-x-6 items-center">
          <CreateTeamDialog />
          <Separator orientation="vertical" className="h-6" />
          {/* <ModeToggle /> */}
          <AvatarDropdown avatarSrc={avatar} avatarFallback="U" />
        </div>
      </div>
      <Separator />
    </div>
  );
}
