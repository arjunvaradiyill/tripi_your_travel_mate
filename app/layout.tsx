import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/AuthContext";
import { ThemeProvider } from "@/app/context/ThemeContext";
import Nav from "@/components/Home/NavBar/Nav";
import Footer from "@/components/Footer/Footer";

// Setup task
// Customize your font { watch the video }
// Customize your meta data

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tripi - Your Travel Companion",
  description: "Discover the world with Tripi - Your perfect travel companion for unforgettable adventures",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          <ThemeProvider>
            <Nav />
            <main className="relative">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
