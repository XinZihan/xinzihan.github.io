<script>
document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(
    'input[name="search-checklist"]'
  );

  const progressText = document.getElementById("checklist-progress");
  const message = document.getElementById("checklist-message");
  const resetButton = document.getElementById("reset-checklist");

  const storageKey = "searchToolkitChecklist";

  function saveChecklist() {
    const savedValues = Array.from(checkboxes).map(
      checkbox => checkbox.checked
    );

    localStorage.setItem(storageKey, JSON.stringify(savedValues));
  }

  function updateChecklist() {
    let completed = 0;

    checkboxes.forEach(checkbox => {
      const item = checkbox.closest(".checklist-item");

      if (checkbox.checked) {
        completed++;
        item.classList.add("completed");
      } else {
        item.classList.remove("completed");
      }
    });

    progressText.textContent =
      `${completed} of ${checkboxes.length} completed`;

    if (completed === checkboxes.length) {
      message.textContent =
        "You are ready to evaluate your search beyond the first page.";
    } else {
      message.textContent = "";
    }

    saveChecklist();
  }

  function loadChecklist() {
    const savedData = localStorage.getItem(storageKey);

    if (!savedData) {
      updateChecklist();
      return;
    }

    try {
      const savedValues = JSON.parse(savedData);

      checkboxes.forEach((checkbox, index) => {
        checkbox.checked = Boolean(savedValues[index]);
      });
    } catch (error) {
      localStorage.removeItem(storageKey);
    }

    updateChecklist();
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updateChecklist);
  });

  resetButton.addEventListener("click", () => {
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });

    localStorage.removeItem(storageKey);
    updateChecklist();
  });

  loadChecklist();
});
</script>