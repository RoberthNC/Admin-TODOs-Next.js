"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export function TabBar({
  tabOptions = [1, 2, 3, 4, 5],
  currentTab = 1,
}: Props) {
  const router = useRouter();
  const dynamicGridCols = "grid-cols-" + tabOptions.length.toString();
  const [selected, setSelected] = useState(currentTab);
  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selected-tab", tab.toString());
    router.refresh();
  };
  return (
    <div
      className={`grid w-full ${dynamicGridCols} space-x-2 rounded-xl bg-gray-200 p-2`}
    >
      {tabOptions.map((tab) => (
        <div key={tab}>
          <input
            type="radio"
            checked={selected === tab}
            onChange={() => {}}
            id={tab.toString()}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
}
