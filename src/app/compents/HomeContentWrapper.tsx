"use client"; // This makes the component a Client Component

import { usePathname } from "next/navigation";
import Home from "../(portfolio)/Home/page";


export default function HomeContentWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null; // don't show on Home page
  return <Home />; // show on all other pages
}
