"use client"
import { useRouter } from "next/navigation";
export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const router = useRouter();
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if(token && userId){
        router.push(`/dashboard/${userId}`);
        return null;
    }
    return <>{children}</>;
  }
  