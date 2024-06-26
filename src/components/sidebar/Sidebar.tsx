import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./SidebarItem";
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { getServerSession } from "next-auth";
import { LogoutButton } from "./LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const items = [
  {
    icon: <IoCalendarOutline size={20} />,
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <IoCheckboxOutline size={20} />,
    href: "/dashboard/rest-todos",
    label: "Rest TODOs",
  },
  {
    icon: <IoListOutline size={20} />,
    href: "/dashboard/server-actions",
    label: "Server Actions",
  },
  {
    icon: <IoCodeWorkingOutline size={20} />,
    href: "/dashboard/cookies",
    label: "Cookies",
  },
  {
    icon: <IoBasketOutline size={20} />,
    href: "/dashboard/products",
    label: "Products",
  },
  {
    icon: <IoPersonOutline size={20} />,
    href: "/dashboard/profile",
    label: "Profile",
  },
];

export async function Sidebar() {
  const session = await getServerSession(authOptions);
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              width={128}
              height={32}
              alt="tailus logo"
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={`${
              !session?.user?.image
                ? "https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp"
                : session.user.image
            }`}
            alt=""
            height={112}
            width={112}
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? "No name"}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.roles?.join(", ") ?? ["client"]}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {items.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
}
