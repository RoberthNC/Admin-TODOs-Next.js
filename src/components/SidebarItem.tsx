"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  item: {
    icon: React.ReactNode;
    href: string;
    label: string;
  };
}

export function SidebarItem({ item }: Props) {
  const { icon, href, label } = item;
  const path = usePathname();
  return (
    <li>
      <Link
        href={href}
        className={`
          px-4 py-3 flex items-center space-x-4 rounded-md group
          hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
          ${
            path === href
              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
              : ""
          }`}
      >
        {icon}
        <span className="group-hover:text-white-700">{label}</span>
      </Link>
    </li>
  );
}
