const params = new URLSearchParams(window.location.search);

const customerID = params.get("customerID");
const fullName = params.get("fullName");
const email = params.get("email");
const subscription = params.get("subscription");
const securedID = params.get("securedID");

if (customerID && fullName && email && subscription && securedID) {
  localStorage.setItem("UserID", securedID);
  localStorage.setItem("customerID", customerID);
  localStorage.setItem("emailAddress", decodeURIComponent(email));
  localStorage.setItem("subscription", subscription);
  localStorage.setItem("username", decodeURIComponent(fullName));

  // ⏳ Set expiration timestamp (24 hours from now)
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("sessionExpiresAt", expiresAt.toString());

  // 🧹 Clean URL
  if (window.history.replaceState) {
    const cleanURL = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, cleanURL);
  }

  // 🚪 Redirect to dashboard
  window.location.href("/print/explore/dashboard");
}
