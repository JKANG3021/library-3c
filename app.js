// Handle user registration
document.getElementById("registerUser").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting in the default way

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
        return;
    }

    fetch('localhost/lib_project/public/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check if data is received correctly
        if(data.status === 'success') {
            alert('User registered successfully');
        } else {
            alert('Error: ' + data.data.title);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while registering the user.');
    });
});

// Handle user login
document.getElementById("loginUser").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    if (username === "" || password === "") {
        alert("Please fill in both username and password.");
        return;
    }

    fetch('localhost/lib_project/public/user/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log response to check if the data is correct
        if(data.status === 'success') {
            localStorage.setItem('token', data.token);
            loadUserData();
        } else {
            alert('Authentication failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    });
});

// Fetch user data
function loadUserData() {
    let token = localStorage.getItem('token');

    if (!token) {
        alert("You need to log in first.");
        return;
    }
    
    fetch('/user/show', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log response to ensure data is fetched
        if (data.status === 'fail') {
            alert(data.data.title);
            return;
        }
        document.getElementById('userData').innerHTML = JSON.stringify(data.data);
        document.getElementById('dataContainer').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching user data.');
    });
}
