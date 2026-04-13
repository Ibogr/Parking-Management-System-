const BASE_URL = "https://parking-management-system-yubr.onrender.com";

// 🔐 safe token getter
function getTokenHeader() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null; // ❗ crash yok
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

// LOGIN
export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// SIGNUP
export async function signupUser(userEmail, password, userName) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userEmail, password, userName }),
  });

  return res.json();
}

// 🔥 SAFE REQUEST WRAPPER
async function authFetch(url, options = {}) {
  const tokenHeader = getTokenHeader();

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(tokenHeader ? tokenHeader : {}),
      ...(options.headers || {}),
    },
  });

  const text = await res.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text);
  }

  if (!res.ok) {
    throw new Error(data.message || text);
  }

  return data;
}

// SUBMIT
export function submitParkingBatch(data) {
  return authFetch(`${BASE_URL}/submit-batch`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// REPORT
export function getReport(data) {
  return authFetch(`${BASE_URL}/report`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// LOGOUT
export function logout() {
  localStorage.removeItem("token");
}
