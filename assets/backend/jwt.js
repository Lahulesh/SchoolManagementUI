const API_BASE_URL_JWT = "https://localhost:7286";

const UsersEndPointss = {
  GetUser: `${API_BASE_URL_JWT}/api/User/GetUser`,
  CreateUser: `${API_BASE_URL_JWT}/api/User/CreateUser`,
  GetUserByID: `${API_BASE_URL_JWT}/api/User/GetUserByID`,
  UpdateUser: `${API_BASE_URL_JWT}/api/User/UpdateUser`,
  DeleteUser: `${API_BASE_URL_JWT}/api/User/DeleteUser`,
  Roles: `${API_BASE_URL_JWT}/api/User/Roles`,
  GetUserLogin: `${API_BASE_URL_JWT}/api/User/GetUserLogin`,
};

// function checkAuthentication() {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     if (!isAuthenticated) {
//         if (window.location.pathname !== '/login.html') {
//             window.location.replace('login.html');
//         }
//     }
// }

function checkAuthentication() {
  // Check if the user is authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
      // If not on the login page, redirect to login
      if (window.location.pathname !== '/login.html') {
          // Store the original page before redirecting
          sessionStorage.setItem('requestedPage', window.location.pathname);
          // Set a flag to prevent multiple redirects
          if (!sessionStorage.getItem('redirected')) {
              sessionStorage.setItem('redirected', 'true'); 
              window.location.replace('login.html');
          }
      }
  } else {
      // If authenticated, clear the redirection flag
      sessionStorage.removeItem('redirected');

      // Check if there's a stored page to redirect to after login
      const requestedPage = sessionStorage.getItem('requestedPage');
      if (requestedPage && window.location.pathname === '/login.html') {
          // Redirect back to the originally requested page
          window.location.replace(requestedPage);
          sessionStorage.removeItem('requestedPage'); // Clear the stored page
      }
  }
}


function setAuthenticationStatus(status) {
    localStorage.setItem('isAuthenticated', status ? 'true' : 'false');
}

// Call checkAuthentication on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
});

function getUserLogin(userName) {
    // Set the API endpoint URL
    const apiUrl = `${API_BASE_URL_JWT}/api/User/GetUserLogin?userName=${encodeURIComponent(userName)}`; // Assuming Login is your base URL for the API
    // Make the GET request to fetch user login details
    
  
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include credentials if needed (like cookies)
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response if the request is successful
        } else {
          throw new Error("Failed to retrieve user details.");
        }
      })
      .then((data) => {
        if (data && data.user) {
            // Access user details from the nested 'user' object
            const user = data.user;
            sessionStorage.setItem('userName', user.userName);
            sessionStorage.setItem('userRole', user.role);
            sessionStorage.setItem('branchCode', user.branchCode);
            alert(`User Name: ${user.userName}`);
            // Perform further actions with the retrieved data
          } else {
            showSideAlert("User not found or error in fetching data.", "error");
          }
      })
      .catch((error) => {
        console.error("Error:", error);
        showSideAlert(error.message, "error");
      });
  }