import { useState, useEffect } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authFlag = localStorage.getItem("adminAuth");
    if (authFlag === "true") {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  return { user: isAuthenticated, loading };
}
