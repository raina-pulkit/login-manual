import Image from "next/image";
import Link from "next/link";
import { getSession } from "../utils/lib";
import ProfileMenu from "./profileMenu";
import Logo from "@/public/images/logo.png"
import LoginBtn from "./loginBtn";

const NavBar = async () => {
  const user = await getSession();

  return (
    <div className="top-0 bg-zinc-400 py-4 border-b border-orange-500 w-full z-10">
      <div className="container flex items-center justify-between w-full flex-col sm:flex-row gap-2 sm:gap-0">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt={"Corvid Logo"}
            height={80}
            width={80}
            priority
            className="rounded-full"
          />
        </Link>
        {user ? <ProfileMenu session={user} />: <LoginBtn session={user}/>}
      </div>
    </div>
  );
};

export default NavBar;
