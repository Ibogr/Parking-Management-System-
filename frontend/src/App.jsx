import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import  jwtDecode from "jwt-decode";

function App() {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [loading, setLoading] = useState(true);

  // ================== AUTO LOGIN ==================
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);

      console.log("DECODED:", decoded);

      setUser({
        id: decoded.id,
        userName: decoded.userName,
        userEmail: decoded.userEmail,
      });
    } catch (err) {
      console.log("Token invalid ❌", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // ================== LOADING ==================
  if (loading) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>
        Loading...
      </div>
    );
  }

  // ================== LOGIN / SIGNUP ==================
  if (!user) {
    return showSignup ? (
      <Signup switchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login
        onLogin={(token) => {
          try {
            localStorage.setItem("token", token);

            const decoded = jwtDecode(token);

            setUser({
              id: decoded.id,
              userName: decoded.userName,
              userEmail: decoded.userEmail,
            });
          } catch (err) {
            console.log("Login decode error ❌", err);
          }
        }}
        switchToSignup={() => setShowSignup(true)}
      />
    );
  }

  // ================== DASHBOARD ==================
  return (
    <Dashboard
      user={user}
      onLogout={() => {
        localStorage.removeItem("token");
        setUser(null);
      }}
    />
  );
}

export default App;
