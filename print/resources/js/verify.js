// Check on page load
window.addEventListener('DOMContentLoaded', function () {
  const customerId = localStorage.getItem('customerID');
  const referenceId = localStorage.getItem('UserID');

  if (!customerId || !referenceId) {
    window.location.href = '/print/login?e=expire';
  }
});

// Logout function
function logout() {
  localStorage.clear();
  window.location.href = '/print/login';
}

// Check if expired
const sessionExpiresAt = localStorage.getItem("sessionExpiresAt") || "0", 10;
if (sessionExpiresAt && sessionExpiresAt !== "unlimited" && Date.now() > Number(sessionExpiresAt)) {
  localStorage.clear();
  window.location.href = '/print/login?e=expire';
}
