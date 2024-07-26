'use client'

import { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    const [dataFromLocalStorage, setDataFromLocalStorage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token: string = String(localStorage.getItem('token'));
            setDataFromLocalStorage(token);
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (dataFromLocalStorage && ['/user/login'].includes(pathname)) {
        router.push('/');
    } else {
        return <section>{children}</section>;
    }
}








// 'use client'
// // import { useEffect } from "react";
// import { useRouter, usePathname } from 'next/navigation';
// export default function LoignLayout({
//     children,
// }: {
//     children: React.ReactNode
// }) {

//     // const router = useRouter();
//     // const pathname = usePathname();
//     // const token = localStorage.getItem('token');
//     // if (token && ['/user/login'].includes(pathname)) {
//     //     router.push("/")
//     // } else {
//     return <section>{children}</section>
//     // }
// }