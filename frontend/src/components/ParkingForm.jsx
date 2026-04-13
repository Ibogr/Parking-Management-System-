import { useState } from "react";
import { submitParkingBatch, getReport } from "../services/api";

export default function ParkingForm({user}) {
  const [site, setSite] = useState("ShamrockHouse");
  const [row, setRow] = useState("Row 1");
  const [spaceNumber, setSpaceNumber] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [date, setDate] = useState("");
  const [list, setList] = useState([]);
  const [warning, setWarning] = useState("");

  const addToList = () => {
    if (!plateNumber || !spaceNumber) return;
    console.log(plateNumber, spaceNumber);

    const exists = list.some(
      (i) => i.row === row && String(i.spaceNumber) === String(spaceNumber)
    );

    if (exists) {
      setWarning(`⚠️ Space ${spaceNumber} already used`);
      return;
    }

    setWarning("");

    setList([...list, { plateNumber, spaceNumber, row }]);

    setPlateNumber("");
    setSpaceNumber("");
  };

const submitAll = async () => {
  if (list.length === 0) {
    alert("List is empty ❌");
    return;
  }

  if (!date) {
    alert("Select date ❌");
    return;
  }

  try {
    const res = await submitParkingBatch({
      site,
      date,
      entries: list,
    });
console.log("res",res);

    if (res.success) {
      alert("Saved ✅");
      setList([]);
    } else {
      alert(res.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server crashed ❌");
  }  
};

  const printReport = async () => {
    await getReport({ site, date, user});
    alert("Report sent!");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.card}>
          <h2 style={styles.title}>Parking System</h2>

          {warning && <div style={styles.warning}>{warning}</div>}

          <select
            style={styles.input}
            onChange={(e) => setSite(e.target.value)}
          >
            <option>ShamrockHouse</option>
            <option>WHCP zone 1</option>
            <option>WHCP zone 2</option>
          </select>

          <select style={styles.input} onChange={(e) => setRow(e.target.value)}>
            {[...Array(10)].map((_, i) => (
              <option key={i}>Row {i + 1}</option>
            ))}
          </select>

          <input
            style={styles.input}
            placeholder="Space Number"
            value={spaceNumber}
            onChange={(e) => setSpaceNumber(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Plate Number"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
          />

          <input
            style={styles.input}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />

          <button style={styles.btn} onClick={addToList}>
            Add
          </button>

          <button style={styles.btnPrimary} onClick={submitAll}>
            Submit All
          </button>

          <button style={styles.btnSecondary} onClick={printReport}>
            Print Report
          </button>
        </div>

        {/* RIGHT */}
        <div style={styles.card}>
          <h3 style={styles.title}>Today's Entries</h3>

          {list.length === 0 && (
            <div style={{ color: "#777" }}>No entries yet</div>
          )}

          {list.map((item, i) => (
            <div key={i} style={styles.row}>
              <span>
                🚗 {item.plateNumber} | {item.row} | Space {item.spaceNumber}
              </span>

              <button
                style={styles.delete}
                onClick={() => setList(list.filter((_, index) => index !== i))}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#0d0d0d",
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },

  container: {
    width: "100%",
    maxWidth: "1200px", // 🔥 full screen ama kontrollü
    display: "flex",
    gap: "20px",
    flexWrap: "wrap", // 🔥 responsive
  },

  card: {
    flex: 1, // 🔥 eşit genişlik
    minWidth: "320px", // 🔥 mobil kırılma
    backgroundColor: "#1a1a1a",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  title: {
    color: "white",
    marginBottom: "10px",
  },

  input: {
    width: "100%", // 🔥 FULL WIDTH
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #333",
    backgroundColor: "#111",
    color: "white",
    boxSizing: "border-box",
  },

  btn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnPrimary: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000",
    border: "1px solid #555",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  btnSecondary: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#222",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #333",
  },

  delete: {
    background: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  warning: {
    backgroundColor: "#5a0000",
    padding: "8px",
    borderRadius: "6px",
    color: "white",
  },
};
