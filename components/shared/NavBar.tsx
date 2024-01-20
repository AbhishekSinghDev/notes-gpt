import Image from "next/image";
import Link from "next/link";
import React from "react";

import logo from "@/public/notes-gpt-logo.svg";
import { UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="p-4 shadow">
      <div className="flex flex-wrap gap-3 items-center justify-between max-w-7xl m-auto">
        <Link href="/notes" className="flex items-center gap-2">
          <Image src={logo} height={35} width={35} alt="NotesGPT logo" />
          <span className="font-bold">NotesGPT</span>
        </Link>
        <div className="flex items-center gap-2">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
            }}
          />
          <Button>
            <FaPlus className="mr-2" />
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
