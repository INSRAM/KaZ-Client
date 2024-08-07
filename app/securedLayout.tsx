'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
const inter = Inter({ subsets: ["latin"] });


export default function SecuredLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();
    const pathname = usePathname();
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (!token && !['/user/login', '/user/signup'].includes(pathname)) {
    //         router.push("/user/login")
    //     }
    // }, []);

    return (
        <html lang="en">
            <body className={inter.className} >
                {/* Optionally, you can include other components or UI elements */}
                {/* For example, a navigation bar or header */}
                {/* <Navbar /> */}
                {children}
            </body>
        </html>
    );
}
