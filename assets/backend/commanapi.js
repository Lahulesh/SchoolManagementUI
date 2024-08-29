const API_BASE_URL = "https://localhost:7286";

const AuthEndPoints = {
  Login: `${API_BASE_URL}/api/Auth/Login`,
  Logout: `${API_BASE_URL}/api/Auth/Logout`,
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logOut").addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });
});

function logout() {
  const username = sessionStorage.getItem("userName"); // Replace with the actual username if dynamic

  fetch(`${AuthEndPoints.Logout}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include if your API needs cookies for authentication
    body: JSON.stringify({ username }), // Adjusted to match API expectation
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`Logout failed: ${response.statusText}, ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.message === "User logged out successful") {
        localStorage.removeItem("isAuthenticated");
        sessionStorage.clear();
        window.location.href = "/login.html";
      } else {
        throw new Error("Logout unsuccessful: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      alert("An error occurred while logging out. Please try again.");
    });
}


function startAutoLogout() {
  // Set interval to call the logout function every 10 minutes (600,000 milliseconds)
  setInterval(logout, 60000); // 600000 milliseconds = 10 minutes
}

// Start the auto-logout timer when the page loads
window.onload = function() {
  startAutoLogout();
}

