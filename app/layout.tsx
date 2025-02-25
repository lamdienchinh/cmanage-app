import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layouts/app-sidebar";
import { Header } from "@/components/layouts/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/layouts/theme-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "C-Manage - Project Management",
  description: "Project and team management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={true}>
            <div className="w-full flex h-screen overflow-hidden bg-background">
              <AppSidebar />
              <div className="w-full flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="w-full flex-1 overflow-y-auto px-4 md:px-6 py-4">
                  {children}
                </main>
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
