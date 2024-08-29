function GetProfileset()
{
    document.getElementById('userNameDisplay').textContent = sessionStorage.getItem('userName');
    document.getElementById('userRoleDisplay').textContent = sessionStorage.getItem('userRole');
}

GetProfileset();