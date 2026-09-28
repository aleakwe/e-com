// Authentication client.
// PHP sessions, not localStorage, should represent the logged-in user.
async function loginUser(email, password) {
  const response = await fetch("php/auth/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify({ email, password })
  });
  return response.json();
}
