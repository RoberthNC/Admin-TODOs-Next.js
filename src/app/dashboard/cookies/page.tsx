import { Metadata } from "next";
import { TabBar } from "@/components/";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "This page is for carshop using cookies",
};

export default function CookiesPage() {
  const cookiesStore = cookies();
  const cookieTab = cookiesStore.get("selected-tab")?.value ?? "1";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
