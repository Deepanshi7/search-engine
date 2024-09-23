document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("searchButton");
    const clearHistoryButton = document.getElementById("clearHistoryButton");
    const searchInput = document.getElementById("searchInput");
    const historyList = document.getElementById("historyList");

    // Load search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Display the search history on page load
    displayHistory();

    // Search Button Click Event
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            // Add the search term to the history
            searchHistory.push(searchTerm);

            // Save the updated history to localStorage
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

            // Clear the input field
            searchInput.value = "";

            // Update the search history display
            displayHistory();
        }
    });

    // Clear History Button Click Event
    clearHistoryButton.addEventListener("click", () => {
        // Clear search history from localStorage
        localStorage.removeItem("searchHistory");

        // Clear the searchHistory array
        searchHistory = [];

        // Update the search history display
        displayHistory();
    });

    // Function to display search history
    function displayHistory() {
        // Clear the current history list
        historyList.innerHTML = "";

        // Add each search term to the history list with a delete button
        searchHistory.forEach((term, index) => {
            const listItem = document.createElement("li");

            // Create a flex container for term and delete button
            const itemContainer = document.createElement("div");
            itemContainer.className = "history-item";

            // Create a span to hold the search term
            const termSpan = document.createElement("span");
            termSpan.textContent = term;
            termSpan.className = "term-text";

            // Create a delete icon button using Google Material Icons
            const deleteButton = document.createElement("span");
            deleteButton.className = "material-icons delete-button";
            deleteButton.textContent = "Delete";

            // Attach click event to delete the specific term
            deleteButton.addEventListener("click", () => {
                deleteSearchTerm(index);
            });

            // Append the term and delete button to the container
            itemContainer.appendChild(termSpan);
            itemContainer.appendChild(deleteButton);

            // Append the container to the list item
            listItem.appendChild(itemContainer);
            historyList.appendChild(listItem);
        });
    }

    // Function to delete a specific search term
    function deleteSearchTerm(index) {
        // Remove the term at the specified index
        searchHistory.splice(index, 1);

        // Save the updated history to localStorage
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

        // Update the search history display
        displayHistory();
    }
});
