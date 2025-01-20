// Function to fetch data from local storage and display it on the results page
document.addEventListener("DOMContentLoaded", () => {
    const displayResults = () => {
 
        const currentUserJSON = localStorage.getItem("currentUser");
        const currentUser = currentUserJSON ? JSON.parse(currentUserJSON) : null;
 
        if (currentUser) {
            // Update the results page elements with the current user's data
            document.getElementById("currentUser").textContent = currentUser.name;
            document.getElementById("score").textContent = currentUser.score;
            document.getElementById("total").textContent = "100"; // Adjust the total score as needed
            document.getElementById("feedback").textContent = getFeedback(currentUser.score);
        } else {
            // If no current user exists, display a default message
            document.getElementById("currentUser").textContent = "N/A";
            document.getElementById("score").textContent = "N/A";
            document.getElementById("total").textContent = "N/A";
            document.getElementById("feedback").textContent = "No results found.";
        }
    };
 
    // Function to provide feedback based on the score
    const getFeedback = (score) => {
        if (score >= 80) return "Excellent job!";
        if (score >= 50) return "Good effort, keep practicing!";
        return "Keep trying! Practice makes perfect.";
    };
 
    // Call the displayResults function when the page loads
    displayResults();
 });
 