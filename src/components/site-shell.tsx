"use client";

import { usePathname } from "next/navigation";
import Nav from "./nav";
import Footer from "./footer";
import Cursor from "./cursor";
import Preloader from "./preloader";
import ScrollProgress from "./scroll-progress";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) return <>{children}</>;

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <div className="noise-overlay" />
      <Cursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
