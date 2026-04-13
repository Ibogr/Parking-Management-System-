import { useState } from "react";
import { loginUser } from "../services/api";

export default function Login({ onLogin, switchToSignup }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ userEmail, password });
      console.log(res.token);
      
      
      
      if (res.success) {
        onLogin(res.token); // 🔥 FIX
      } else {
        alert("Login failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Login</h2>

        <input
          style={styles.input}
          placeholder="user-Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <p style={styles.link} onClick={switchToSignup}>
          Create account
        </p>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  container: {
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#1e1e1e",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.5)",
  },

  title: {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: "10px",
  },

  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "white",
    outline: "none",
  },

  button: {
    padding: "12px",
    border: "none",
    backgroundColor: "#3a3a3a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  link: {
    textAlign: "center",
    color: "#aaa",
    cursor: "pointer",
  },
};
