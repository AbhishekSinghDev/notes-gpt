import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/public/notes-gpt-logo.svg";
import { UserButton } from "@clerk/nextjs";
import AddNoteDialog from "./AddNoteDialog";
import { ModeToggle } from "./DarkModeToggle";

const NavBar = () => {
  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-2">
            <Image src={logo} height={35} width={35} alt="NotesGPT logo" />
            <span className="font-bold">NotesGPT</span>
          </Link>
          <div className="flex items-center gap-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: { width: "2.5rem", height: "2.5rem" },
                },
              }}
            />

            <ModeToggle />
            <AddNoteDialog />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
