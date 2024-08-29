const API_BASE_URL = 'https://localhost:7286';

const BranchEndPoints = {
  GetBranches: `${API_BASE_URL}/api/Branch/GetBranches`,
  CreateBranch: `${API_BASE_URL}/api/Branch/CreateBranch`,
  GetBranchByID: `${API_BASE_URL}/api/Branch/GetBranchByID`,
  UpdateBranch: `${API_BASE_URL}/api/Branch/UpdateBranch`,
  DeleteBranch: `${API_BASE_URL}/api/Branch/DeleteBranch`
};

const LogoutEndPoints = {
  Logout: `${API_BASE_URL}/api/Auth/Logout`
};

const baseApiUrl = 'https://localhost:7286';
const endpoint = '/api/Branch';
const apiUrl = `${baseApiUrl}${endpoint}`;

function fetchBranches() {
    fetch(`${apiUrl}/GetBranches`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch users. Server responded with status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        // Access the users array from the response data
        const branches = data.getbranch;
  
        // Check if users is an array and process it
        if (Array.isArray(branches)) {
          const branchesTableBody = document.querySelector("#branchtable tbody");
          branchesTableBody.innerHTML = "";
  
          branches.forEach(branch => {
            const branchesRow = document.createElement("tr");
            const formattedbranchCreatedDate = formatDate(branch.branchCreatedDate);
            branchesRow.innerHTML = `
                <td>${branch.branchName}</td>
                <td><a href="mailto:${branch.branchEmailID}">${branch.branchEmailID}</a></td>
                <td>${branch.branchContactNumber}</td>
                <td>${formattedbranchCreatedDate}</td>
                <td>
                <button type="button" class="btn btn-added" data-bs-toggle="modal" data-bs-target="#addupdatebranch" onclick="openUpdateModal(${branch.branchID})">
                  <img src="assets/img/icons/edit.svg" alt="Edit">
                </button>
                <a class="confirm-delete" data-branch-id="${branch.branchID}">
                  <img src="assets/img/icons/delete.svg" alt="Delete">
                </a>
              </td>
              `;
              branchesTableBody.appendChild(branchesRow);
          });
  
          // Add event listener for delete buttons
          document.querySelectorAll(".confirm-delete").forEach(button => {
            button.addEventListener("click", function () {
              const branchId = this.getAttribute("data-branch-id");
  
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
              }).then(result => {
                if (result.isConfirmed) {
                  deleteBranch(branchId);
                }
              });
            });
          });
        } else {
          console.error("Unexpected data format:", data);
          showSideAlert("Unexpected data format received. Please try again later.", "error");
        }
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        showSideAlert("Unable to fetch users at the moment. Please try again later.", "error");
      });
  }


  function createBranch() {
    // Validate the form first
    if (!BranchValidation()) {
      return; // Stop the function if validation fails
    }
    // Get form data
    const branchName = document.getElementById("branchname").value.trim();
    const branchEmailID = document.getElementById("branchemail").value.trim();
    const branchContactNumber = document.getElementById("branchphone").value.trim();
    
  
    // Check for empty fields
    // if (!username || !password || !email || !phone || !roles) {
    //   showSideAlert("All fields are required!", "warning");
    //   return; // Stop the function if any field is empty
    // }
  
    const branchData = {
        branchName: branchName,
        branchEmailID: branchEmailID,
        branchContactNumber: branchContactNumber
    };
  
    // Send the POST request
    fetch(`${apiUrl}/CreateBranch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(branchData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status === 204) {
          return null;
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        $("#addupdatebranch").modal("hide");
        Swal.fire({
          icon: "success",
          title: "Branch Created!",
          text: "The branch has been created successfully.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then(() => {
          // New method or additional action here
          location.reload(); // Reload the page
          fetchBranches(); // Refresh the user list
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        showSideAlert("An error occurred. Please try again.", "error");
      });
  }

  function deleteBranch(branchId) {
    fetch(`${apiUrl}/DeleteBranch/${branchId}`, {
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
          text: "The branch has been deleted.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then(() => {
            fetchBranches(); // Refresh the user list
          location.reload(); // Reload the page
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        showSideAlert("Failed to delete the branch. Please try again.", "error");
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("branchCreate").addEventListener("click", function (event) {
        event.preventDefault();
        createBranch();
      });
  });
  fetchBranches();


  function BranchValidation() {
    // Validate User Name (must not be empty and should be between 3 to 50 characters)
    var branchName = document.getElementById("branchname").value.trim();
    if (branchName === "") {
      showSideAlert("Branch Name is required.", "error");
      return false;
    }
    if (branchName.length < 3 || branchName.length > 15) {
      showSideAlert("Branch Name must be between 3 and 15 characters.", "error");
      return false;
    }
  
    // Validate Phone (must be a 10-digit number, no letters or special characters)
    var phone = document.getElementById("branchphone").value.trim();
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
    var email = document.getElementById("branchemail").value.trim();
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email === "") {
      showSideAlert("Email is required.", "error");
      return false;
    }
    if (!emailPattern.test(email)) {
      showSideAlert("Please enter a valid email address.", "error");
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


//   UpdateModalPopUp
function openUpdateModal(userId) {
    const statusMessage = document.getElementById("statusMessage");
    const branchCreate = document.getElementById("branchCreate");
    const branchUpdate = document.getElementById("branchUpdate");
    statusMessage.innerText = "Update";
    branchUpdate.style.display = "block";
    branchCreate.style.display = "none";
    // Fetch user data by ID (optional: if not already available in user object)
    // fetch(`https://localhost:7245/api/Users/${userId}`)
    fetch(`${apiUrl}/GetBranchByID/${userId}`)
      .then(response => response.json())
      .then(user => {
        // Populate the modal fields
        document.getElementById("updatebranchId").value = user.branchID;
        document.getElementById("branchname").value = user.branchName;
        document.getElementById("branchphone").value = user.branchContactNumber;
        document.getElementById("branchemail").value = user.branchEmailID;
      })
      .catch(error => console.error("Error fetching user data:", error));
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Event listener for the 'Update User' button in the modal
    document.getElementById("branchUpdate").addEventListener("click", function (event) {
        event.preventDefault();
  
        // Get the userId from the hidden input field
        const branchId = document.getElementById("updatebranchId").value;
        if (!branchId) {
          showSideAlert("User ID is missing. Please try again.", "error");
          return;
        }
  
        // Call the updateUser function with the current userId
        updateBranch(branchId);
      });
  });
  
  function updateBranch(branchId) {
    // const password = document.getElementById("password").value.trim();
    // if (!password) {
    //   showSideAlert('Password is required.', 'error');
    //   return;
    // }
  
    const updatedBranch = {
      branchID: document.getElementById("updatebranchId").value.trim(),
      branchName: document.getElementById("branchname").value.trim(),
      branchEmailID: document.getElementById("branchemail").value.trim(),
      branchContactNumber: document.getElementById("branchphone").value.trim(),
      //password: password
    };
  
    fetch(`${BranchEndPoints.UpdateBranch}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBranch),
    })
      .then((response) => {
        // Check if response is JSON or text
        const contentType = response.headers.get("content-type");
  
        if (response.ok) {
          if (contentType && contentType.includes("application/json")) {
            return response.json().then((data) => {
              console.log("Branch updated successfully:", data);
              $("#addupdatebranch").modal("hide");
              Swal.fire({
                icon: "success",
                title: "Branch Updated!",
                text: "The branch has been updated successfully.",
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
              $("#addupdatebranch").modal("hide");
            });
          } else {
            // Handle other content types or empty responses
            console.warn("Unexpected response format");
            showSideAlert("Unexpected response format from server.", "warning");
            $("#addupdatebranch").modal("hide");
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

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logOut").addEventListener("click", function (event) {
      event.preventDefault();
      logout();
    });
  });
  
  function logout() {
    const username = sessionStorage.getItem('userName'); // Replace with the actual username if dynamic
  
    fetch(`${LogoutEndPoints.Logout}`, {
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