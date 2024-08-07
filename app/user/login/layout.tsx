// 'use client'

// import { useEffect, useState } from "react";
// import { useRouter } from 'next/navigation';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    // const [isLoading, setIsLoading] = useState(true);
    // const router = useRouter();

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const token = localStorage.getItem('token');
    //         console.log("this is token ==> ", token)

    //         // Check if token is valid (not null or empty)
    //         if (token) {
    //             router.push('/');
    //             return;
    //         }
    //         setIsLoading(false);
    //     }
    // }, [router]);

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    return <section>{children}</section>;
}
