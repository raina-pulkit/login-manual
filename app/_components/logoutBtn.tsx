import { buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { myLogout } from "../utils/lib";

const LogOutBtn = async () => {
  return (
    <Link
      href={"/"}
      className={
        buttonVariants({ variant: "outline" }) +
        " flex justify-between items-center w-20 px-1.5 py-0"
      }
      onClick={async () => await myLogout()}
    >
      <LogOut />
      Log Out
    </Link>
  );
};

export default LogOutBtn;
