import { useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      userId,
      userRole,
      setUserId,
      setUserRole,
    }),
    [userId, userRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
