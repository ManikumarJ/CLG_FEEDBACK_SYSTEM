document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    loginForm.appendChild(messageDiv);

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Simple validation (replace with your logic)
        if (username === "manikumar" && password === "Welcome@123") {
            messageDiv.textContent = "Login successful!";
            messageDiv.style.color = "green";

            window.location.href = '../HTML/student_dashboard.html#profile';
        } else {
            messageDiv.textContent = "Invalid username or password.";
            messageDiv.style.color = "red";
        }
    });
});

// CREATE NEW ACCOUNT VALIDATION
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('createAccountForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const messages = document.querySelectorAll('.error-message');
        messages.forEach(msg => msg.remove());

        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const retypePassword = document.getElementById('re-type_pass').value.trim();
        const section = document.getElementById('section').value.trim();
        const department = document.getElementById('department').value.trim();
        const accountType = document.querySelector('input[name="accountType"]:checked');

        let valid = true;

        if (firstName === '') {
            showError('firstName', 'First Name is required.');
            valid = false;
        }

        if (lastName === '') {
            showError('lastName', 'Last Name is required.');
            valid = false;
        }

        if (email === '') {
            showError('email', 'Email is required.');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Invalid email format.');
            valid = false;
        }

        if (password === '') {
            showError('password', 'Password is required.');
            valid = false;
        } else if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters long.');
            valid = false;
        }

        if (retypePassword === '') {
            showError('re-type_pass', 'Please re-type your password.');
            valid = false;
        } else if (password !== retypePassword) {
            showError('re-type_pass', 'Passwords do not match.');
            valid = false;
        }

        if (!accountType) {
            showError('Please select an account type (Student or Staff).');
            valid = false;
        }

        if (accountType && accountType.value === 'student') {
            if (section === '') {
                showError('section', 'Section is required.');
                valid = false;
            } else if (!/^[A-Z]$/.test(section)) {
                showError('section', 'Section must be a single uppercase letter (A, B, C, etc.).');
                valid = false;
            }
        }

        if (accountType && accountType.value === 'staff') {
            if (department === '') {
                showError('department', 'Department is required.');
                valid = false;
            }
        }

        if (valid) {
            alert('Account created successfully!');
            form.submit(); 
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'red';
        error.textContent = message;
        field.parentNode.insertBefore(error, field.nextSibling);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Functions to show/hide specific fields based on account type
    window.showStudentForm = function() {
        document.getElementById('studentFields').style.display = 'block';
        document.getElementById('staffFields').style.display = 'none';
    };

    window.showStaffForm = function() {
        document.getElementById('studentFields').style.display = 'none';
        document.getElementById('staffFields').style.display = 'block';
    };
});
