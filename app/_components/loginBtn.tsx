"use client";

import { buttonVariants } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LoginBtn = ({ session }: { session: string | null }) => {
  const pathname = usePathname() === "/login";

  if(session) return;
  if (!pathname) {
    return (
      <Link
        href={"/login"}
        className={
          "group flex justify-between items-center hover:w-auto w-10 h-10 gap-1 !px-1 !py-1 rounded-full transition-all duration-200 ease-in-out " +
          buttonVariants({ variant: "outline" })
        }
      >
        <LogIn />
        <div className="overflow-hidden w-0 group-hover:w-10 transition-all duration-200 ease-in-out">Login</div>
      </Link>
    );
  }

  return null;
};

export default LoginBtn;
