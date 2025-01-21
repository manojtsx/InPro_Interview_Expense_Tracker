import React from 'react';
import UserDashboard from "@/components/UserDashboard";
import { PageProps } from "@/interfaces/OtherInterface";

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const { userId } = params; // Ensure the parameter name matches the file path
  return <UserDashboard userId={userId} />;
};

export default Page;