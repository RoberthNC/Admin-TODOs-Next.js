"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiBookmarkCheck } from "react-icons/ci";

interface Props {
  item: {
    href: string;
    label: string;
  };
}

export function SidebarItem({ item }: Props) {
  const { href, label } = item;
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group ${
          path === href
            ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
            : ""
        }`}
      >
        <CiBookmarkCheck size={30} />
        <span className="group-hover:text-gray-700">{label}</span>
      </Link>
    </li>
  );
}
