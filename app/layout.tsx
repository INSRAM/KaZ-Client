import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "KaZ",
  description: "KaZ: Chat with ease",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={inter.className} >
          {/* Optionally, you can include other components or UI elements */}
          {/* For example, a navigation bar or header */}
          {/* <Navbar /> */}
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
