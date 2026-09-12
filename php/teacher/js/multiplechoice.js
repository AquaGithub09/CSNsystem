document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("chooseQuestionsContainer");
  const addButton = document.getElementById("addChooseQuestionBtn");

  let questionCount = 0;

  // ==========================================
  // ADD QUESTION
  // ==========================================

  function addChooseQuestion() {
    questionCount++;

    const questionId = questionCount;

    const questionCard = document.createElement("div");

    questionCard.className = "question-card teacher-card mb-4";
    questionCard.dataset.questionId = questionId;

    questionCard.innerHTML = `
      
      <!-- QUESTION HEADER -->
      <div class="question-card-header d-flex justify-content-between align-items-center">
        <div>
          <h6 class="mb-1">
            Question <span class="question-number">${questionId}</span>
          </h6>

        </div>

        <!-- DELETE BUTTON -->
        <span
          class="fs-3 text-danger delete-question-btn"
          title="Delete question"
        >
          <i class="bi bi-x-square-fill"></i>
        </span>
      </div>


      <!-- QUESTION BODY -->
      <div class="question-card-body">

        <!-- QUESTION -->
        <div class="mb-3">
          <label class="form-label fw-semibold">
            Question
          </label>

          <textarea
            class="form-control question-input"
            rows="2"
            placeholder="Example: What color is the apple?"
          ></textarea>
        </div>


        <!-- IMAGE UPLOAD -->
        <div class="mb-4">

          <label class="form-label fw-semibold">
            Attach Image
            <span class="text-danger fw-normal">*</span>
          </label>

          <div class="image-upload-area">

            <input
              type="file"
              class="form-control question-image-input"
              accept="image/*"
            />

            <!-- IMAGE PREVIEW -->
            <div class="question-image-preview mt-3 d-none">

              <div class="position-relative d-inline-block">

                <img
                  src=""
                  class="img-fluid rounded question-preview-image"
                  alt="Question image preview"
                />

                <span                
                  class="text-danger fs-4 remove-question-image"
                  title="Remove image"
                >
                  <i class="bi bi-x-square-fill"></i>
                </span>

              </div>

            </div>

          </div>

        </div>


        <!-- ANSWERS -->
        <div class="mb-3">

          <label class="form-label fw-semibold">
            Answer Choices
          </label>

          <div class="row g-3">

            <!-- A -->
            <div class="col-12 col-md-3">

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
            <div class="col-12 col-md-3">

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
            <div class="col-12 col-md-3">

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
            <div class="col-12 col-md-3">

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
        <div class="mt-4">

          <label class="form-label fw-semibold">
            Correct Answer
          </label>

          <select class="form-select correct-answer-input">

            <option value="">
              Select the correct answer
            </option>

            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>

          </select>

          <div class="form-text">
            Select which answer is correct.
          </div>

        </div>

      </div>
    `;

    container.appendChild(questionCard);

    updateQuestionNumbers();
    updateDeleteButtons();
  }

  // ==========================================
  // DELETE QUESTION
  // ==========================================

  function deleteQuestion(questionCard) {
    questionCard.remove();

    questionCount--;

    updateQuestionNumbers();
    updateDeleteButtons();
  }

  // ==========================================
  // UPDATE QUESTION NUMBERS
  // ==========================================

  function updateQuestionNumbers() {
    const questions = container.querySelectorAll(".question-card");

    questions.forEach((question, index) => {
      const number = question.querySelector(".question-number");

      number.textContent = index + 1;
    });
  }

  // ==========================================
  // SHOW / HIDE DELETE BUTTON
  // ==========================================

  function updateDeleteButtons() {
    const questions = container.querySelectorAll(".question-card");

    const deleteButtons = container.querySelectorAll(".delete-question-btn");

    // Only one question
    if (questions.length <= 1) {
      deleteButtons.forEach((button) => {
        button.classList.add("d-none");
      });
    } else {
      deleteButtons.forEach((button) => {
        button.classList.remove("d-none");
      });
    }
  }

  // ==========================================
  // IMAGE PREVIEW
  // ==========================================

  function handleImageUpload(input) {
    const questionCard = input.closest(".question-card");

    const previewContainer = questionCard.querySelector(
      ".question-image-preview",
    );

    const previewImage = questionCard.querySelector(".question-preview-image");

    const file = input.files[0];

    if (!file) {
      previewContainer.classList.add("d-none");
      previewImage.src = "";
      return;
    }

    // Make sure it is an image
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");

      input.value = "";

      previewContainer.classList.add("d-none");

      return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
      previewImage.src = event.target.result;

      previewContainer.classList.remove("d-none");
    };

    reader.readAsDataURL(file);
  }

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  function removeImage(button) {
    const questionCard = button.closest(".question-card");

    const input = questionCard.querySelector(".question-image-input");

    const previewContainer = questionCard.querySelector(
      ".question-image-preview",
    );

    const previewImage = questionCard.querySelector(".question-preview-image");

    input.value = "";

    previewImage.src = "";

    previewContainer.classList.add("d-none");
  }

  // ==========================================
  // ADD QUESTION BUTTON
  // ==========================================

  addButton.addEventListener("click", () => {
    addChooseQuestion();
  });

  // ==========================================
  // EVENT DELEGATION
  // ==========================================

  container.addEventListener("click", (event) => {
    // DELETE QUESTION
    const deleteButton = event.target.closest(".delete-question-btn");

    if (deleteButton) {
      const questionCard = deleteButton.closest(".question-card");

      deleteQuestion(questionCard);

      return;
    }

    // REMOVE IMAGE
    const removeImageButton = event.target.closest(".remove-question-image");

    if (removeImageButton) {
      removeImage(removeImageButton);
    }
  });

  // ==========================================
  // IMAGE INPUT CHANGE
  // ==========================================

  container.addEventListener("change", (event) => {
    if (event.target.classList.contains("question-image-input")) {
      handleImageUpload(event.target);
    }
  });

  // ==========================================
  // CREATE FIRST QUESTION AUTOMATICALLY
  // ==========================================

  addChooseQuestion();
});


const helpBadge = document.getElementById("selectedActivityBadge");
const helpVideoPopup = document.getElementById("helpVideoPopup");
const helpTutorialVideo = document.getElementById("helpTutorialVideo");
const closeHelpVideo = document.getElementById("closeHelpVideo");

// Open tutorial
helpBadge.addEventListener("click", function () {
  helpVideoPopup.classList.add("show");

  // Reset video
  helpTutorialVideo.currentTime = 0;

  // Play after the popup is shown
  setTimeout(() => {
    helpTutorialVideo
      .play()
      .catch((error) => {
        console.error("Video could not play:", error);
      });
  }, 100);
});

// Close button
closeHelpVideo.addEventListener("click", function () {
  closeTutorial();
});

// Click outside popup
document.addEventListener("click", function (event) {
  if (
    helpVideoPopup.classList.contains("show") &&
    !helpVideoPopup.contains(event.target) &&
    !helpBadge.contains(event.target)
  ) {
    closeTutorial();
  }
});

// Close tutorial
function closeTutorial() {
  helpVideoPopup.classList.remove("show");

  helpTutorialVideo.pause();
  helpTutorialVideo.currentTime = 0;
}