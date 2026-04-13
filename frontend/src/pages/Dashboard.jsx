import ParkingForm from "../components/ParkingForm";

export default function Dashboard({ user, onLogout }) {
  const logout = () => {
    localStorage.removeItem("token"); // 🔥 token sil
    onLogout(); // state temizle
  };

  return (
    <div style={styles.wrapper}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.welcome}>Welcome</h2>
          <p style={styles.username}>{user.userName}</p>
        </div>

        <button style={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>

      {/* CONTENT */}
      <ParkingForm user={user} />
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "30px",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  welcome: {
    margin: 0,
    color: "#aaa",
  },
  username: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "bold",
  },
  logoutBtn: {
    padding: "8px 15px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },
};
