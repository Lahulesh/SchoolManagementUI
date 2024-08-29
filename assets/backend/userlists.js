const API_BASE_URL = 'https://localhost:7286';

const UsersEndPoints = {
  GetUser: `${API_BASE_URL}/api/User/GetUser`,
  CreateUser: `${API_BASE_URL}/api/User/CreateUser`,
  GetUserByID: `${API_BASE_URL}/api/User/GetUserByID`,
  UpdateUser: `${API_BASE_URL}/api/User/UpdateUser`,
  DeleteUser: `${API_BASE_URL}/api/User/DeleteUser`,
  Roles: `${API_BASE_URL}/api/User/Roles`,
  GetUserLogin: `${API_BASE_URL}/api/User/GetUserLogin`,
};

//const apiUrl = "https://localhost:7227/api/User";
const logoutUrl = "https://localhost:7286/api/Login/logout";

const baseApiUrl = "https://localhost:7286";
const endpoint = "/api/User";
const login = "/api/Auth";
const apiUrl = `${baseApiUrl}${endpoint}`;
const apiLogoutUrl = `${baseApiUrl}`;
const getdatalogin = `${baseApiUrl}${login}`;

// function fetchUsers() {
//   fetch(`${apiUrl}/GetUser`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error("Failed to fetch users. Server responded with status: " + response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Access the users array from the response data
//       const users = data.getuser;

//       // Check if users is an array and process it
//       if (Array.isArray(users)) {
//         const usersTableBody = document.querySelector("#usersTable tbody");
//         usersTableBody.innerHTML = "";

//         users.forEach(user => {
//           const userRow = document.createElement("tr");
//           // Determine the badge based on isActive value
//           const isActiveText = user.isActive ? "Active" : "Inactive";
//           const activeBadge = user.isActive ? '<span class="badges bg-lightred">Active</span>' : '<span class="badges bg-lightgreen">InActive</span>';
//           const formattedUserCreatedDate = formatDate(user.userCreatedDate);
//           const formatteduserUpdatedDate = formatDate(user.userUpdatedDate);
//           const formatteduserLoginTime = formatDate(user.userLoginTime);
//           const formatteduserLogoutTime = formatDate(user.userLogoutTime);
//             userRow.innerHTML = `
//               <td>${user.userName}</td>
//               <td>${user.contactNumber}</td>
//               <td><a href="mailto:${user.userEmailID}">${user.userEmailID}</a></td>
//               <td>${user.role}</td>
//               <td>${activeBadge}</td>
//               <td>${formattedUserCreatedDate}</td>
//               <td>${formatteduserUpdatedDate}</td>
//               <td>${formatteduserLoginTime}</td>
//               <td>${formatteduserLogoutTime}</td>
//               <td>${user.branchCode}</td>
//               <td>
//                 <button type="button" class="btn btn-added" data-bs-toggle="modal" data-bs-target="#addupdateuser" onclick="openUpdateModal(${user.userID})">
//                   <img src="assets/img/icons/edit.svg" alt="Edit">
//                 </button>
//                 <a class="confirm-delete" data-user-id="${user.userID}">
//                   <img src="assets/img/icons/delete.svg" alt="Delete">
//                 </a>
//               </td>
//             `;
//             usersTableBody.appendChild(userRow);
//         });

//         // Add event listener for delete buttons
//         document.querySelectorAll(".confirm-delete").forEach(button => {
//           button.addEventListener("click", function () {
//             const userId = this.getAttribute("data-user-id");

//             Swal.fire({
//               title: "Are you sure?",
//               text: "You won't be able to revert this!",
//               icon: "warning",
//               showCancelButton: true,
//               confirmButtonColor: "#3085d6",
//               cancelButtonColor: "#d33",
//               confirmButtonText: "Yes, delete it!",
//               customClass: {
//                 confirmButton: "btn btn-primary",
//                 cancelButton: "btn btn-danger ml-1",
//               },
//               buttonsStyling: false,
//             }).then(result => {
//               if (result.isConfirmed) {
//                 deleteUser(userId);
//               }
//             });
//           });
//         });
//       } else {
//         console.error("Unexpected data format:", data);
//         showSideAlert("Unexpected data format received. Please try again later.", "error");
//       }
//     })
//     .catch(error => {
//       console.error("Error fetching users:", error);
//       showSideAlert("Unable to fetch users at the moment. Please try again later.", "error");
//     });
// }

function fetchUsers() {
  // Retrieve the token from local storage or any other storage mechanism
  //const token = localStorage.getItem('authToken'); // Update this based on your storage strategy
  //alert(token);
  // Check if the token is available
  // if (!token) {
  //   // Swal.fire({
  //   //   icon: 'error',
  //   //   title: 'Authentication Required',
  //   //   text: 'Please log in to access this resource.',
  //   //   confirmButtonColor: '#3085d6',
  //   // });
  //   //showSideAlert("Unexpected data format received. Please try again later.", "error");
  //   alert("Please log in to access this resource.");
  //   return;
  // }

  fetch(`${UsersEndPoints.GetUser}`, {
    method: "GET",
    // headers: {
    //   'Authorization': `Bearer ${token}`, // Add token to the Authorization header
    //   'Content-Type': 'application/json'
    // }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Failed to fetch users. Server responded with status: " +
            response.status
        );
      }
      return response.json();
    })
    .then((data) => {
      // Access the users array from the response data
      const users = data.getuser;
      //getUserLogin('Emma185');
      // Check if users is an array and process it
      if (Array.isArray(users)) {
        const usersTableBody = document.querySelector("#usersTable tbody");
        usersTableBody.innerHTML = "";

        users.forEach((user) => {
          const userRow = document.createElement("tr");
          // Determine the badge based on isActive value
          const isActiveText = user.isActive ? "Active" : "Inactive";
          const activeBadge = user.isActive
            ? '<span class="badges bg-lightred">Active</span>'
            : '<span class="badges bg-lightgreen">InActive</span>';
          const formattedUserCreatedDate = formatDate(user.userCreatedDate);
          const formatteduserUpdatedDate = formatDate(user.userUpdatedDate);
          const formatteduserLoginTime = formatDate(user.userLoginTime);
          const formatteduserLogoutTime = formatDate(user.userLogoutTime);
          userRow.innerHTML = `
              <td>${user.userName}</td>
              <td>${user.contactNumber}</td>
              <td><a href="mailto:${user.userEmailID}">${user.userEmailID}</a></td>
              <td>${user.role}</td>
              <td>${activeBadge}</td>
              <td>${formattedUserCreatedDate}</td>
              <td>${formatteduserUpdatedDate}</td>
              <td>${formatteduserLoginTime}</td>
              <td>${formatteduserLogoutTime}</td>
              <td>${user.branchCode}</td>
              <td>
                <button type="button" class="btn btn-added" data-bs-toggle="modal" data-bs-target="#addupdateuser" onclick="openUpdateModal(${user.userID})">
                  <img src="assets/img/icons/edit.svg" alt="Edit">
                </button>
                <a class="confirm-delete" data-user-id="${user.userID}">
                  <img src="assets/img/icons/delete.svg" alt="Delete">
                </a>
              </td>
            `;
          usersTableBody.appendChild(userRow);
        });

        // Add event listener for delete buttons
        document.querySelectorAll(".confirm-delete").forEach((button) => {
          button.addEventListener("click", function () {
            const userId = this.getAttribute("data-user-id");

            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
              customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: "btn btn-danger ml-1",
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                deleteUser(userId);
              }
            });
          });
        });
      } else {
        console.error("Unexpected data format:", data);
        showSideAlert(
          "Unexpected data format received. Please try again later.",
          "error"
        );
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      showSideAlert(
        "Unable to fetch users at the moment. Please try again later.",
        "error"
      );
    });
}

//CreateUser
// function createUser() {
//   // Validate the form first
//   if (!validateForm()) {
//     return; // Stop the function if validation fails
//   }
//   // Get form data
//   const username = document.getElementById("username").value.trim();
//   const password = document.getElementById("password").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const roles = document.getElementById("roles").value.trim();

//   const userData = {
//     userName: username,
//     userPassword: password,
//     userEmailID: email,
//     contactNumber: phone,
//     role: roles,
//     branchCode: sessionStorage.getItem('branchCode'),
//     // Add other properties as needed
//   };

//   // Send the POST request
//   fetch(`${UsersEndPoints.CreateUser}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       if (response.status === 204) {
//         return null;
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Success:", data);
//       $("#addupdateuser").modal("hide");
//       Swal.fire({
//         icon: "success",
//         title: "User Created!",
//         text: "The user has been created successfully.",
//         customClass: {
//           confirmButton: "btn btn-success",
//         },
//       }).then(() => {
//         location.reload();
//       });
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       showSideAlert("An error occurred. Please try again.", "error");
//     });
// }


function createUser() {
  // Validate the form first
  if (!validateForm()) {
    return; // Stop the function if validation fails
  }

  // Get form data
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const roles = document.getElementById("roles").value.trim();

  const userData = {
    userName: username,
    userPassword: password,
    userEmailID: email,
    contactNumber: phone,
    role: roles,
    branchCode: sessionStorage.getItem('branchCode'), // Use sessionStorage to get branch code
  };

  // Send the POST request
  fetch(`${UsersEndPoints.CreateUser}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        // Handle different status codes
        if (response.status === 409) {
          // Conflict - Duplicate user found
          throw new Error("A user with the same details already exists.");
        } else if (response.status === 400) {
          // Bad Request - Invalid data
          throw new Error("Invalid user data provided.");
        } else if (response.status === 500) {
          // Internal Server Error
          throw new Error("An unexpected error occurred on the server.");
        } else {
          throw new Error("Network response was not ok.");
        }
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      $("#addupdateuser").modal("hide"); // Hide modal on success
      Swal.fire({
        icon: "success",
        title: "User Created!",
        text: data.message || "The user has been created successfully.",
        customClass: {
          confirmButton: "btn btn-success",
        },
      }).then(() => {
        location.reload(); // Reload the page to update the user list
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      // Show appropriate error message to the user
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    });
}



//Delete User
function deleteUser(userId) {
  fetch(`${UsersEndPoints.DeleteUser}/${userId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The user has been deleted.",
        customClass: {
          confirmButton: "btn btn-success",
        },
      }).then(() => {
        fetchUsers(); // Refresh the user list
        location.reload(); // Reload the page
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      showSideAlert("Failed to delete the user. Please try again.", "error");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("userCreate").addEventListener("click", function (event) {
      event.preventDefault();
      createUser();
    });
});

fetchUsers();

function validateForm() {
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

  // Validate Phone (must be a 10-digit number, no letters or special characters)
  var phone = document.getElementById("phone").value.trim();
  var phonePattern = /^\d{10}$/;
  if (phone === "") {
    showSideAlert("Phone number is required.", "error");
    return false;
  }
  if (!phonePattern.test(phone)) {
    showSideAlert("Please enter a valid 10-digit phone number.", "error");
    return false;
  }

  // Validate Email (must follow standard email format)
  var email = document.getElementById("email").value.trim();
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email === "") {
    showSideAlert("Email is required.", "error");
    return false;
  }
  if (!emailPattern.test(email)) {
    showSideAlert("Please enter a valid email address.", "error");
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
    showSideAlert(
      "Password must contain at least one uppercase letter.",
      "error"
    );
    return false;
  }
  if (!lowerCasePattern.test(password)) {
    showSideAlert(
      "Password must contain at least one lowercase letter.",
      "error"
    );
    return false;
  }
  if (!digitPattern.test(password)) {
    showSideAlert("Password must contain at least one digit.", "error");
    return false;
  }
  if (!specialCharPattern.test(password)) {
    showSideAlert(
      "Password must contain at least one special character.",
      "error"
    );
    return false;
  }

  // const selectedRole = document.getElementById("roles").value;

  // // Validate that a role has been selected
  // if (selectedRole === "") {
  //   showSideAlert("Please select a role.", "error");
  //   return false;
  // }

  // If all validations pass
  return true;
}

//Update Users

function openUpdateModal(userId) {
  const statusMessage = document.getElementById("statusMessage");
  const userCreate = document.getElementById("userCreate");
  const userUpdate = document.getElementById("userUpdate");
  statusMessage.innerText = "Update";
  userUpdate.style.display = "block";
  userCreate.style.display = "none";
  fetch(`${UsersEndPoints.GetUserByID}/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      // Populate the modal fields
      document.getElementById("updateUserId").value = user.userID;
      document.getElementById("username").value = user.userName;
      document.getElementById("phone").value = user.contactNumber;
      document.getElementById("email").value = user.userEmailID;
      //document.getElementById("roles").value = user.role;
      const rolesSelect = document.getElementById("roles");
      // Set the role in the dropdown
      // Set the role in the dropdown
      if (user.role) {
        // Ensure the value exists in the dropdown options
        const optionExists = Array.from(rolesSelect.options).some(
          (option) => option.value === user.role
        );

        if (optionExists) {
          rolesSelect.value = user.role; // Set the dropdown value
        } else {
          rolesSelect.value = ""; // Reset to default if the role is invalid
        }
      } else {
        rolesSelect.value = ""; // Reset to default if no role is provided
      }
      // const defaultOption = document.createElement("option");
      // defaultOption.value = "";
      // defaultOption.text = rolesSelect.value = user.role;
      // rolesSelect.add(defaultOption);

      document.getElementById("password").value = user.userPassword;
    })
    .catch((error) => console.error("Error fetching user data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  // Event listener for the 'Update User' button in the modal
  document
    .getElementById("userUpdate")
    .addEventListener("click", function (event) {
      event.preventDefault();

      // Get the userId from the hidden input field
      const userId = document.getElementById("updateUserId").value;
      if (!userId) {
        showSideAlert("User ID is missing. Please try again.", "error");
        return;
      }

      // Call the updateUser function with the current userId
      updateUser(userId);
    });
});

function updateUser(userId) {
  // const password = document.getElementById("password").value.trim();
  // if (!password) {
  //   showSideAlert('Password is required.', 'error');
  //   return;
  // }

  const updatedUser = {
    userID: document.getElementById("updateUserId").value.trim(),
    userName: document.getElementById("username").value.trim(),
    userEmailID: document.getElementById("email").value.trim(),
    contactNumber: document.getElementById("phone").value.trim(),
    role: document.getElementById("roles").value.trim(),
    //password: password
  };

  fetch(`${UsersEndPoints.UpdateUser}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => {
      // Check if response is JSON or text
      const contentType = response.headers.get("content-type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          return response.json().then((data) => {
            console.log("User updated successfully:", data);
            $("#addupdateuser").modal("hide");
            Swal.fire({
              icon: "success",
              title: "User Updated!",
              text: "The user has been updated successfully.",
              customClass: {
                confirmButton: "btn btn-success",
              },
            }).then(() => {
              location.reload(); // or fetchUsers();
            });
          });
        } else if (contentType && contentType.includes("text/plain")) {
          return response.text().then((text) => {
            console.log("Update response:", text);
            showSideAlert("User updated successfully, but no JSON response was returned.","success");
            $("#addupdateuser").modal("hide");
          });
        } else {
          // Handle other content types or empty responses
          console.warn("Unexpected response format");
          showSideAlert("Unexpected response format from server.", "warning");
          $("#addupdateuser").modal("hide");
        }
      } else {
        // Handle HTTP errors
        return response.text().then((text) => {
          console.error("Error response:", text);
          showSideAlert("An error occurred while updating the user. Please try again.","error");
        });
      }
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      showSideAlert("An error occurred while updating the user. Please try again.","error");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("logOut").addEventListener("click", function (event) {
    event.preventDefault();
    logout();
  });
});

function logout() {
  const username = sessionStorage.getItem('userName'); // Replace with the actual username if dynamic

  fetch(`${apiLogoutUrl}/api/Auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include if your API needs cookies for authentication
    body: JSON.stringify({ username }), // Adjusted to match API expectation
  })
    .then((response) => {
      if (!response.ok) {
        // Extract response text and include it in the error message
        return response.text().then((text) => {
          throw new Error(`Logout failed: ${response.statusText}, ${text}`);
        });
      }
      // Parse JSON response if status is OK
      return response.json();
    })
    .then((data) => {
      // Check if the response message indicates success
      if (data.message === "User logged out successful") {
        // Clear any client-side authentication tokens or user data
        localStorage.removeItem("isAuthenticated");
        sessionStorage.clear();
        // Redirect to login page or other appropriate action
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

function getCurrentUsername() {
  fetch("https://localhost:7227/api/Auth/CurrentUser", {
    method: "GET",
    credentials: "include", // Include cookies with the request
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          try {
            const errorData = JSON.parse(text);
            throw new Error(
              `Failed to fetch current user: ${response.statusText}, ${errorData.message}`
            );
          } catch (e) {
            throw new Error(
              `Failed to fetch current user: ${response.statusText}, ${text}`
            );
          }
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("API response:", data);
      // Handle the fetched data (e.g., update UI or store user data)
    })
    .catch((error) => {
      console.error("Error fetching current user:", error);
      alert("Failed to get current user details. Please try again.");
    });
}

//getCurrentUsername();

// function logout() {
//   getCurrentUsername()
//     .then(username => {
//       return fetch('https://localhost:7245/api/Login/Logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include',  // Include if your API needs cookies for authentication
//         body: JSON.stringify({ username })  // Pass the username to the API
//       });
//     })
//     .then(response => {
//       if (!response.ok) {
//         return response.text().then(text => {
//           throw new Error(`Logout failed: ${response.statusText}, ${text}`);
//         });
//       }
//       return response.json();
//     })
//     .then(data => {
//       if (data.message === "User logged out successful") {
//         localStorage.removeItem('authToken');
//         sessionStorage.removeItem('user');
//         window.location.href = '/login.html';
//       } else {
//         throw new Error('Logout unsuccessful: ' + data.message);
//       }
//     })
//     .catch(error => {
//       console.error('Logout error:', error);
//       alert('An error occurred while logging out. Please try again.');
//     });
// }

//loadRoles();
function formatDate(dateString) {
  // Check if the dateString is null, undefined, or an empty string
  if (!dateString) {
    return ""; // Return an empty string for null, undefined, or empty values
  }

  const date = new Date(dateString);

  // Validate if date is valid
  if (isNaN(date.getTime())) {
    return ""; // Return an empty string for invalid date values
  }

  // Get day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" }); // 'Aug'
  const year = date.getFullYear();

  // Get hours and minutes
  const hours24 = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure two digits for minutes

  // Determine AM or PM
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12; // Convert to 12-hour format, 0 becomes 12

  // Construct formatted date string
  return `${day}-${month}-${year} ${hours12}:${minutes} ${period}`;
}

// Function to send POST request

