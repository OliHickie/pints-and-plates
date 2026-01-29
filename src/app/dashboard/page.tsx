"use client";

import { useUser } from "@/context/UserContext";
import Map from "@/components/map/Map";

const Dashboard = () => {
  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ padding: '32px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>
          Welcome {user?.firstName}
        </h1>
      </div>
      <div style={{ flex: 1, padding: '0 32px 32px' }}>
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;