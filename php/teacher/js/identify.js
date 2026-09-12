document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("identifyQuestionsContainer");
  const addButton = document.getElementById("addIdentifyQuestionBtn");
  let itemCount = 0;

  function addIdentifyQuestion() {
    itemCount++;
    const itemId = itemCount;

    // Each item is its own column (4 per row on large screens)
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.dataset.itemId = itemId;

    col.innerHTML = `
      <div class="question-card teacher-card h-100">
        <div class="question-card-header d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0">
            Item <span class="item-number">${itemId}</span>
          </h6>

          <span
            class="fs-4 text-danger delete-identify-item-btn ${itemId === 1 ? "d-none" : ""}"
            title="Delete question"
            style="cursor: pointer;"
          >
            <i class="bi bi-x-square-fill"></i>
          </span>
        </div>

        <div class="question-card-body">

          <!-- INSTRUCTION -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Instruction</label>
            <input
              type="text"
              class="form-control identify-instruction-input"
              placeholder="Example: What shape is this?"
            />
          </div>

          <!-- IMAGE UPLOAD -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Attach Image to Identify</label>
            <input
              type="file"
              class="form-control identify-image-input"
              accept="image/*"
            />

            <div class="identify-image-preview mt-2 d-none">
              <div class="position-relative d-inline-block">
                <img
                  src=""
                  class="img-fluid rounded identify-preview-image"
                  alt="Preview"
                  style="max-height: 120px; object-fit: contain;"
                />
                <span
                  class="text-danger fs-5 remove-identify-image"
                  title="Remove image"
                  style="cursor: pointer; position: absolute; top: 2px; right: 2px;"
                >
                  <i class="bi bi-x-square-fill"></i>
                </span>
              </div>
            </div>
          </div>
          
          <div class="mb-3">

          <label class="form-label fw-semibold">
            Answer Choices
          </label>

          <div class="row g-3">

            <!-- A -->
            <div class="col-12 col-md-6">

              <div class="answer-input-wrapper">

                <span class="answer-label">A</span>

                <input
                  type="text"
                  class="form-control answer-input"
                  data-answer="A"
                  placeholder="Answer A"
                />

              </div>

            </div>


            <!-- B -->
            <div class="col-12 col-md-6">

              <div class="answer-input-wrapper">

                <span class="answer-label">B</span>

                <input
                  type="text"
                  class="form-control answer-input"
                  data-answer="B"
                  placeholder="Answer B"
                />

              </div>

            </div>


            <!-- C -->
            <div class="col-12 col-md-6">

              <div class="answer-input-wrapper">

                <span class="answer-label">C</span>

                <input
                  type="text"
                  class="form-control answer-input"
                  data-answer="C"
                  placeholder="Answer C"
                />

              </div>

            </div>


            <!-- D -->
            <div class="col-12 col-md-6">

              <div class="answer-input-wrapper">

                <span class="answer-label">D</span>

                <input
                  type="text"
                  class="form-control answer-input"
                  data-answer="D"
                  placeholder="Answer D"
                />

              </div>

            </div>

          </div>

        </div>

          <!-- CORRECT ANSWER -->
          <div>
            <label class="form-label fw-semibold">Correct Answer</label>
            <input
              type="text"
              class="form-control identify-answer-input"
              placeholder="Example: Triangle"
            />
          </div>

        </div>
      </div>
    `;

    container.appendChild(col);
    updateItemNumbers();
    updateDeleteButtons();
  }

  // Delete question
  function deleteIdentifyItem(col) {
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
    const deleteBtns = container.querySelectorAll(".delete-identify-item-btn");

    if (items.length <= 1) {
      deleteBtns.forEach(btn => btn.classList.add("d-none"));
    } else {
      deleteBtns.forEach(btn => btn.classList.remove("d-none"));
    }
  }

  // Image preview
  function handleImageUpload(input) {
    const card = input.closest(".question-card");
    const previewBox = card.querySelector(".identify-image-preview");
    const previewImg = card.querySelector(".identify-preview-image");
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
    const input = card.querySelector(".identify-image-input");
    const previewBox = card.querySelector(".identify-image-preview");
    const previewImg = card.querySelector(".identify-preview-image");

    input.value = "";
    previewImg.src = "";
    previewBox.classList.add("d-none");
  }

  // Events
  addButton.addEventListener("click", addIdentifyQuestion);

  container.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete-identify-item-btn");
    if (deleteBtn) {
      deleteIdentifyItem(deleteBtn.closest("[data-item-id]"));
      return;
    }

    const removeBtn = e.target.closest(".remove-identify-image");
    if (removeBtn) {
      removeImage(removeBtn);
    }
  });

  container.addEventListener("change", (e) => {
    if (e.target.classList.contains("identify-image-input")) {
      handleImageUpload(e.target);
    }
  });

  // Start with 4 questions (so you immediately see a full row)
  for (let i = 0; i < 3; i++) {
    addIdentifyQuestion();
  }
});