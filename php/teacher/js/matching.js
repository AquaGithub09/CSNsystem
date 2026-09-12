document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("matchPairsContainer");
  const addButton = document.getElementById("addMatchPairBtn");
  let itemCount = 0;

  function addMatchingItem() {
    itemCount++;
    const itemId = itemCount;

    // Each item is now its own column (4 per row on large screens)
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.dataset.itemId = itemId;

    col.innerHTML = `
      <div class="question-card teacher-card h-100">
        <div class="question-card-header d-flex justify-content-between align-items-center">
          <h6 class="mb-0">
            Item <span class="item-number">${itemId}</span>
          </h6>

          <span
            class="fs-4 text-danger delete-match-item-btn ${itemId === 1 ? "d-none" : ""}"
            title="Delete item"
            style="cursor: pointer;"
          >
            <i class="bi bi-x-square-fill"></i>
          </span>
        </div>

        <div class="question-card-body">
          <!-- IMAGE UPLOAD -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Attach Image</label>
            <input
              type="file"
              class="form-control match-image-input"
              accept="image/*"
            />

            <div class="match-image-preview mt-2 d-none">
              <div class="position-relative d-inline-block">
                <img
                  src=""
                  class="img-fluid rounded match-preview-image"
                  alt="Preview"
                  style="max-height: 140px; object-fit: contain;"
                />
                <span
                  class="text-danger fs-5 remove-match-image"
                  title="Remove image"
                  style="cursor: pointer; position: absolute; top: 2px; right: 2px;"
                >
                  <i class="bi bi-x-square-fill"></i>
                </span>
              </div>
            </div>
          </div>

          <!-- TEXT INPUT -->
          <div>
            <label class="form-label fw-semibold">Text / Answer</label>
            <input
              type="text"
              class="form-control match-text-input"
              placeholder="Example: Apple"
            />
          </div>
        </div>
      </div>
    `;

    container.appendChild(col);
    updateItemNumbers();
    updateDeleteButtons();
  }

  // Delete item
  function deleteMatchingItem(col) {
    const items = container.querySelectorAll("[data-item-id]");
    if (items.length <= 1) return;

    col.remove();
    itemCount--;
    updateItemNumbers();
    updateDeleteButtons();
  }

  // Update numbers after delete
  function updateItemNumbers() {
    const items = container.querySelectorAll("[data-item-id]");
    items.forEach((item, index) => {
      const numberEl = item.querySelector(".item-number");
      if (numberEl) numberEl.textContent = index + 1;
      item.dataset.itemId = index + 1;
    });
  }

  // Show/hide delete buttons
  function updateDeleteButtons() {
    const items = container.querySelectorAll("[data-item-id]");
    const deleteBtns = container.querySelectorAll(".delete-match-item-btn");

    if (items.length <= 1) {
      deleteBtns.forEach(btn => btn.classList.add("d-none"));
    } else {
      deleteBtns.forEach(btn => btn.classList.remove("d-none"));
    }
  }

  // Image preview
  function handleImageUpload(input) {
    const card = input.closest(".question-card");
    const previewBox = card.querySelector(".match-image-preview");
    const previewImg = card.querySelector(".match-preview-image");
    const file = input.files[0];

    if (!file || !file.type.startsWith("image/")) {
      previewBox.classList.add("d-none");
      previewImg.src = "";
      if (file) {
        alert("Please select an image file.");
        input.value = "";
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      previewBox.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
  }

  // Remove image
  function removeImage(btn) {
    const card = btn.closest(".question-card");
    const input = card.querySelector(".match-image-input");
    const previewBox = card.querySelector(".match-image-preview");
    const previewImg = card.querySelector(".match-preview-image");

    input.value = "";
    previewImg.src = "";
    previewBox.classList.add("d-none");
  }

  // Events
  addButton.addEventListener("click", addMatchingItem);

  container.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-match-item-btn");
    if (deleteBtn) {
      deleteMatchingItem(deleteBtn.closest("[data-item-id]"));
      return;
    }

    const removeBtn = e.target.closest(".remove-match-image");
    if (removeBtn) {
      removeImage(removeBtn);
    }
  });

  container.addEventListener("change", (e) => {
    if (e.target.classList.contains("match-image-input")) {
      handleImageUpload(e.target);
    }
  });

  // Start with 4 items (so you immediately see 4 cards in a row)
  for (let i = 0; i < 4; i++) {
    addMatchingItem();
  }
});