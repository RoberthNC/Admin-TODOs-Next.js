import { Metadata } from "next";
import { TabBar } from "@/components/";

export const metadata: Metadata = {
  title: "Cookies Page",
  description: "This page is for carshop using cookies",
};

export default function CookiesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar />
      </div>
    </div>
  );
}
