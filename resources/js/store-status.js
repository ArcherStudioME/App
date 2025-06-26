const forceClose = false;

function updateStoreStatus() {
  const statusEl = document.getElementById("store-status");
  const now = new Date();
  const hour = now.getHours();

  // Store hours: 8 AM to 6 PM (exclusive)
  const isWithinHours = (hour >= 8 && hour < 19);
  const isOpen = isWithinHours && !forceClose;

  if (isOpen) {
    statusEl.textContent = "STORE OPEN";
    statusEl.classList.remove("text-light");
    statusEl.classList.add("text-success");
  } else {
    statusEl.textContent = "STORE CLOSED";
    statusEl.classList.remove("text-success");
    statusEl.classList.add("text-light");
  }
}

updateStoreStatus();
setInterval(updateStoreStatus, 60000);

