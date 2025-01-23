"use client";
import Navbar from "@/components/Navbar";
import NoAccess from "@/components/NoAccess";
import useClearLocalStorageOnClose from "../hook/ClearLocalStorageOnClose";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useClearLocalStorageOnClose();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) {
    return <NoAccess />;
  }
  return (
    <>
      {" "}
      <Navbar />
      {children}
    </>
  );
}
