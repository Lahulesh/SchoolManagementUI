//const apiUrl = "https://localhost:7245/api/Login/login";

const API_BASE_URL_Login = "https://localhost:7286";

const AuthEndPoints = {
  Login: `${API_BASE_URL_Login}/api/Auth/Login`,
  Logout: `${API_BASE_URL_Login}/api/Auth/Logout`
};

const baseApiUrl = 'https://localhost:7286';
const endpoint = '/api/Auth';
const apiUrl = `${baseApiUrl}${endpoint}`;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault();
    loginDashboard();
  });
});


function loginDashboard() {
  if (!loginValidateForm()) {
    return; // Stop the function if validation fails
  }
  // Get form data
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const branchcode = document.getElementById("branchcode").value.trim();

  const loginData = {
    userName: username,
    userPassword: password,
    branchCode: branchcode
  };

  // Send the POST request
  fetch(`${AuthEndPoints.Login}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(loginData),
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.message) {
      // Handle specific messages
      if (data.message === "Login successful") {
          // Store token and redirect on successful login
          localStorage.setItem('isAuthenticated', data.user.isActive);
          getUserLogin(data.user.userName);
          window.location.href = "dashboard.html";
      } else if (data.message === "User is already logged in") {
          showSideAlert("You are already logged in. Please log out from other sessions first.", "error");
      } else if (data.message === "Username does not exist") {
          showSideAlert("The username you entered does not exist.", "error");
      } else if (data.message === "Incorrect password") {
          showSideAlert("The password you entered is incorrect.", "error");
      } else if (data.message === "Incorrect branch code") {
          showSideAlert("The branch code you entered is incorrect.", "error");
      } else {
          showSideAlert("An unexpected error occurred. Please try again.", "error");
      }
    } else {
      showSideAlert("An unexpected error occurred. Please try again.", "error");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    showSideAlert("An error occurred. Please try again later.", "error");
  });
}

function loginValidateForm() {
  // Validate User Name (must not be empty and should be between 3 to 50 characters)
  var username = document.getElementById("username").value.trim();
  if (username === "") {
    showSideAlert("User Name is required.", "error");
    return false;
  }
  if (username.length < 3 || username.length > 15) {
    showSideAlert("User Name must be between 3 and 15 characters.", "error");
    return false;
  }

  // Validate Password (must be at least 8 characters, include uppercase, lowercase, digit, and special character)
  var password = document.getElementById("password").value.trim();
  if (password === "") {
    showSideAlert("Password is required.", "error");
    return false;
  }
  if (password.length < 8) {
    showSideAlert("Password must be at least 8 characters long.", "error");
    return false;
  }
  var upperCasePattern = /[A-Z]/;
  var lowerCasePattern = /[a-z]/;
  var digitPattern = /\d/;
  var specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;

  if (!upperCasePattern.test(password)) {
    showSideAlert("Password must contain at least one uppercase letter.","error");
    return false;
  }
  if (!lowerCasePattern.test(password)) {
    showSideAlert("Password must contain at least one lowercase letter.","error");
    return false;
  }
  if (!digitPattern.test(password)) {
    showSideAlert("Password must contain at least one digit.", "error");
    return false;
  }
  if (!specialCharPattern.test(password)) {
    showSideAlert("Password must contain at least one special character.","error");
    return false;
  }

  var branchcode = document.getElementById("branchcode").value.trim();
    
  // Check if the branch code is empty
  if (branchcode === "") {
      showSideAlert("Branch Code is required.", "error");
      return false;
  }
  
  // Check if the branch code is exactly 3 digits
  var branchCodePattern = /^\d{3}$/;
  if (!branchCodePattern.test(branchcode)) {
      showSideAlert("Branch Code must be exactly 3 digits.", "error");
      return false;
  }
  // If all validations pass
  return true;
}
