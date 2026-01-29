"use client";

import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome {user?.firstName}
      </h1>
    </main>
  );
};

export default Dashboard;
