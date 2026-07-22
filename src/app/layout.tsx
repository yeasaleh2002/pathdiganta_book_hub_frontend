import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import dynamic from "next/dynamic";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { CartDrawer } from "@/components/modules/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

// Performance Mandate: Lazy Load non-critical UI like the Toaster
const GlobalToaster = dynamic(
  () => import("@/components/ui/GlobalToaster").then((mod) => mod.GlobalToaster)
);

export const metadata: Metadata = {
  title: {
    default: "Pathdigonto Book Hub",
    template: "%s | Pathdigonto Book Hub",
  },
  description: "A high-traffic, secure, single-vendor online bookstore.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.className} bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-200 antialiased flex flex-col min-h-screen`}>
        <ThemeProvider>
          {children}
          <GlobalToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
