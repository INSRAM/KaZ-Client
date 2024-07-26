import type { Metadata } from "next";
import SecuredLayout from './securedLayout';

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
    <SecuredLayout>
      {children}
    </SecuredLayout>
  );
}
