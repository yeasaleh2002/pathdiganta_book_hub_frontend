import React from "react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CartDrawer } from "@/components/modules/CartDrawer";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <CartDrawer />
      <main className="flex-1 w-full flex flex-col bg-gray-50 dark:bg-gray-900/50">
        {children}
      </main>
      <Footer />
    </>
  );
}
