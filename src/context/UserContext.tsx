"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export type AppUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

type UserContextType = {
  user: AppUser | null;
  loading: boolean;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
          console.log("User fetched:", data);
        });
    }

    if (status === "unauthenticated") {
      setUser(null);
      setLoading(false);
    }
  }, [status]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
