function showSideAlert(message, type = "success") {
  const alert = document.getElementById("side-alert");
  const alertMessage = document.getElementById("side-alert-message");

  if (alert && alertMessage) {  // Check if alert elements exist
      // Reset classes
      alert.className = "side-alert";

      // Add the appropriate class based on the type
      switch (type) {
          case "success":
              alert.classList.add("success");
              break;
          case "warning":
              alert.classList.add("warning");
              break;
          case "error":
              alert.classList.add("error");
              break;
          default:
              alert.classList.add("info");  // Fallback class
              break;
      }

      alertMessage.textContent = message; // Set the message
      alert.classList.add("show"); // Show the alert

      // Automatically hide the alert after 10 seconds
      setTimeout(() => {
          alert.classList.remove("show");
      }, 10000);
  } else {
      console.error("Alert elements not found in the DOM.");
  }
}

// Event listener to close the alert when the close button is clicked
document.addEventListener("DOMContentLoaded", function () {
  const closeAlertButton = document.getElementById("close-alert");
  const alert = document.getElementById("side-alert");

  if (closeAlertButton && alert) {
      closeAlertButton.addEventListener("click", function () {
          alert.classList.remove("show");
      });
  } else {
      console.error("Close alert button or alert container not found in the DOM.");
  }
});
