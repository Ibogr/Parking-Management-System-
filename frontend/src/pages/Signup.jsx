import { useState } from "react";
import { signupUser } from "../services/api";

export default function Signup({ switchToLogin }) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  
  


  const handleSignup = async () => {
    const res = await signupUser(userEmail, password, userName);
console.log(userEmail, password, userName);

    if (res.success) {
      alert("Account created");
      switchToLogin();
    } else {
      alert("User already exists");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          style={styles.input}
          type="email"
          placeholder="User-Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="name"
          placeholder="User Name"
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={handleSignup}>
          Signup
        </button>

        <p onClick={switchToLogin} style={styles.link}>
          Back to Login
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
    backgroundColor: "#121212", // koyu arka plan
  },
  container: {
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "30px",
    borderRadius: "12px",
    backgroundColor: "#1e1e1e", // kart koyu gri
    boxShadow: "0px 8px 25px rgba(0,0,0,0.5)",
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#2a2a2a",
    color: "white",
  },
  button: {
    padding: "10px",
    border: "none",
    backgroundColor: "#3a3a3a",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s",
  },
  link: {
    textAlign: "center",
    color: "#aaa",
    cursor: "pointer",
  },
};
