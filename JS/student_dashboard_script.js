function logout() {
    const confirmation = confirm("Are you sure you want to logout?");
    if (confirmation) {
        // Hide all sections
        const sections = document.querySelectorAll('.content');
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none'; // Hide all sections
        });
        
        // Optionally, show a logout message or perform other logic
        alert("You have been logged out."); // Inform user they are logged out

        // Redirect to the homepage or login page
        window.location.href = 'login.html'; // Replace 'home.html' with your homepage URL
    }
}

let feedbackHistory = [];
let collegeFeedbackHistory = [];

// Handle faculty feedback submission
document.querySelector('form[action="/submit-feedback"]').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather feedback data for faculty
    const feedback = {
        name: event.target.name.value,
        registerNumber: event.target['register-number'].value,
        email: event.target.email.value,
        faculty: event.target.faculty.value,
        teachingStyle: event.target['teaching-style'].value,
        clarity: event.target.clarity.value,
        accessibility: event.target.accessibility.value,
        feedbackHelpfulness: event.target['feedback-helpfulness'].value,
        participation: event.target.participation.value,
    };

    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to submit your feedback?");
    
    if (confirmed) {
        // Add feedback to the history
        feedbackHistory.push(feedback);

        // Clear the form
        event.target.reset();

        // Update feedback display
        displayFeedbackHistory();

        // Show a thank you alert
        alert("Thank you for your feedback!");
    } else {
        console.log("Feedback submission canceled.");
    }
});

// Handle college feedback submission
document.querySelector('form[action="/submit-college-feedback"]').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Gather feedback data for college
    const collegeFeedback = {
        name: event.target.name.value,
        registerNumber: event.target['register-number'].value,
        email: event.target.email.value,
        collegeExperience: event.target['college-experience'].value,
        improvementSuggestions: event.target['improvement-suggestions'].value,
    };

    // Show confirmation dialog
    const confirmed = confirm("Are you sure you want to submit your college feedback?");
    
    if (confirmed) {
        // Add college feedback to the history
        collegeFeedbackHistory.push(collegeFeedback);

        // Clear the form
        event.target.reset();

        // Update feedback display
        displayFeedbackHistory();

        // Show a thank you alert
        alert("Thank you for your college feedback!");
    } else {
        console.log("College feedback submission canceled.");
    }
});

// Display feedback history
function displayFeedbackHistory() {
    const feedbackList = document.getElementById('feedback-list');
    feedbackList.innerHTML = ''; // Clear existing list
    const currentDateTime = new Date().toLocaleString();
    
    // Display faculty feedback history
    feedbackHistory.forEach((feedback, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Faculty Feedback -->${currentDateTime}</strong>: 
            <button onclick="viewFeedback(${index}, 'faculty')">View</button>
            <button onclick="deleteFeedback(${index}, 'faculty')">Delete</button>
        `;
        feedbackList.appendChild(li);
    });

    // Display college feedback history
    collegeFeedbackHistory.forEach((feedback, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>College Feedback -->${currentDateTime}</strong>: 
            <button onclick="viewFeedback(${index}, 'college')">View</button>
            <button onclick="deleteFeedback(${index}, 'college')">Delete</button>
        `;
        feedbackList.appendChild(li);
    });
}
// View feedback details
function viewFeedback(index, type) {
    let feedback;
    const feedbackDetails = document.getElementById('feedback-details');
    
    if (type === 'faculty') {
        feedback = feedbackHistory[index];
        feedbackDetails.innerHTML = `
            <p><strong>This is faculty feedback</strong></p>
            <p><strong>Name:</strong> ${feedback.name}</p>
            <p><strong>Register Number:</strong> ${feedback.registerNumber}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>Faculty:</strong> ${feedback.faculty}</p>
            <p><strong>Teaching Style:</strong> ${feedback.teachingStyle}</p>
            <p><strong>Clarity:</strong> ${feedback.clarity}</p>
            <p><strong>Accessibility:</strong> ${feedback.accessibility}</p>
            <p><strong>Feedback Helpfulness:</strong> ${feedback.feedbackHelpfulness}</p>
            <p><strong>Participation:</strong> ${feedback.participation}</p>
        `;
    } else if (type === 'college') {
        feedback = collegeFeedbackHistory[index];
        feedbackDetails.innerHTML = `
            <p><strong>This is college feedback</strong></p>
            <p><strong>Name:</strong> ${feedback.name}</p>
            <p><strong>Register Number:</strong> ${feedback.registerNumber}</p>
            <p><strong>Email:</strong> ${feedback.email}</p>
            <p><strong>College Experience:</strong> ${feedback.collegeExperience}</p>
            <p><strong>Improvement Suggestions:</strong> ${feedback.improvementSuggestions}</p>
        `;
    }

    // Add a cancel button
    feedbackDetails.innerHTML += `<button onclick="cancelView()">Cancel</button>`;
    
    document.getElementById('view-feedback').style.display = 'block'; // Show feedback details section
}

// Cancel view function
function cancelView() {
    document.getElementById('view-feedback').style.display = 'none'; // Hide feedback details section
}



// Delete feedback by index
function deleteFeedback(index, type) {
    const confirmed = confirm("Are you sure you want to delete this feedback?");
    
    if (confirmed) {
        if (type === 'faculty') {
            feedbackHistory.splice(index, 1); // Remove faculty feedback from array
        } else if (type === 'college') {
            collegeFeedbackHistory.splice(index, 1); // Remove college feedback from array
        }
        
        displayFeedbackHistory(); // Update the display
        document.getElementById('view-feedback').style.display = 'none'; // Hide details if viewing deleted
    } else {
        console.log("Feedback deletion canceled.");
    }
}


// FEEDABCK OPTION

function showFeedbackOptions() {
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('faculty-feedback').style.display = 'none';
    document.getElementById('college-feedback').style.display = 'none';
}

function showFacultyFeedback() {
    document.getElementById('faculty-feedback').style.display = 'block';
    document.getElementById('college-feedback').style.display = 'none';
}

function showCollegeFeedback() {
    document.getElementById('college-feedback').style.display = 'block';
    document.getElementById('faculty-feedback').style.display = 'none';
}