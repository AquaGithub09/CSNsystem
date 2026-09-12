document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("learnerSearch");
  const clearButton = document.getElementById("clearLearnerSearch");
  const learnerItems = document.querySelectorAll(".learner-item");
  const learnerCount = document.getElementById("learnerCount");
  const searchResultText = document.getElementById("searchResultText");
  const noLearnersFound = document.getElementById("noLearnersFound");
  
  function filterLearners() {
    const searchValue = searchInput.value.toLowerCase().trim();
    let visibleCount = 0;
    learnerItems.forEach(item => {
      const learnerName = item.querySelector(".learner-name")?.textContent.toLowerCase().trim() || "";
      const matches = learnerName.includes(searchValue);
      item.classList.toggle("d-none", !matches);
      if (matches) { visibleCount++; }
    }); /* Update count */
    learnerCount.textContent = visibleCount; /* Update result text */
    if (searchValue === "") { searchResultText.textContent = "Showing all learners"; } else { searchResultText.textContent = `Showing ${visibleCount} learner${visibleCount !== 1 ? "s" : ""}`; } /* Show / hide clear button */ clearButton.classList.toggle("d-none", searchValue === ""); /* No results */
    noLearnersFound.classList.toggle("d-none", visibleCount !== 0);
  } /* Search */
  searchInput.addEventListener("input", filterLearners); /* Clear search */
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterLearners();
    searchInput.focus();
  });
});