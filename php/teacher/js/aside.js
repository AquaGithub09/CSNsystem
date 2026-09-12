/* =========================================
   LOAD HTML COMPONENTS
========================================= */

document.addEventListener("DOMContentLoaded", async () => {

  /* =========================================
     LOAD COMPONENTS
  ========================================= */

  await loadComponent(
    "navigationbar",
    "components/navbar/aside.html"
  );

  await loadComponent(
    "footersection",
    "components/footer/footer.html"
  );

  /* =========================================
     COMPONENTS ARE NOW LOADED
     INITIALIZE SIDEBAR
  ========================================= */

  initializeTeacherSidebar();

  /* =========================================
     SET CURRENT PAGE AS ACTIVE
  ========================================= */

  setActiveNavigation();

});


/* =========================================
   LOAD COMPONENT FUNCTION
========================================= */

async function loadComponent(elementId, filePath) {

  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`Element #${elementId} was not found.`);
    return;
  }

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Failed to load: ${filePath}`);
    }

    const html = await response.text();
    element.innerHTML = html;

  } catch (error) {
    console.error(error);
  }

}


/* =========================================
   INITIALIZE TEACHER SIDEBAR
========================================= */

function initializeTeacherSidebar() {

  const sidebar     = document.getElementById("teacherSidebar");
  const menuButton  = document.getElementById("teacherMenu");
  const closeButton = document.getElementById("teacherClose");
  const overlay     = document.getElementById("teacherOverlay");

  /* =========================================
     CHECK SIDEBAR
  ========================================= */

  if (!sidebar) {
    console.error("Teacher sidebar was not found.");
    return;
  }

  /* =========================================
     OPEN SIDEBAR
  ========================================= */

  function openSidebar() {
    sidebar.classList.add("show");
    if (overlay) overlay.classList.add("show");
    document.body.classList.add("sidebar-open");
  }

  /* =========================================
     CLOSE SIDEBAR
  ========================================= */

  function closeSidebar() {
    sidebar.classList.remove("show");
    if (overlay) overlay.classList.remove("show");
    document.body.classList.remove("sidebar-open");
  }

  /* =========================================
     MENU BUTTON
  ========================================= */

  if (menuButton) {
    menuButton.addEventListener("click", openSidebar);
  }

  /* =========================================
     CLOSE BUTTON
  ========================================= */

  if (closeButton) {
    closeButton.addEventListener("click", closeSidebar);
  }

  /* =========================================
     OVERLAY
  ========================================= */

  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  }

  /* =========================================
     ESCAPE KEY
  ========================================= */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  /* =========================================
     CLOSE MOBILE SIDEBAR ON LARGE SCREEN
  ========================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      closeSidebar();
    }
  });

}


/* =========================================
   SET ACTIVE NAVIGATION
========================================= */

function setActiveNavigation() {

  /* =========================================
     GET CURRENT PAGE
  ========================================= */

  const currentPage = (window.location.pathname.split("/").pop() || "").toLowerCase();

  /* =========================================
     GET ALL NAV LINKS
  ========================================= */

  const navigationLinks = document.querySelectorAll(".teacher-nav-link");

  /* =========================================
     LEARNERS
  ========================================= */

  const learnersToggle  = document.querySelector('a[href="#learnersSubmenu"]');
  const learnersSubmenu = document.getElementById("learnersSubmenu");

  /* =========================================
     ACTIVITIES
  ========================================= */

  const activityToggle  = document.querySelector('a[href="#activitySubmenu"]');
  const activitySubmenu = document.getElementById("activitySubmenu");

  /* =========================================
     RESET EVERYTHING
  ========================================= */

  navigationLinks.forEach(link => link.classList.remove("active"));

  if (learnersToggle)  learnersToggle.setAttribute("aria-expanded", "false");
  if (activityToggle)  activityToggle.setAttribute("aria-expanded", "false");

  if (learnersSubmenu) learnersSubmenu.classList.remove("show");
  if (activitySubmenu) activitySubmenu.classList.remove("show");

  /* =========================================
     FIND MATCHING LINK
  ========================================= */

  navigationLinks.forEach(link => {

    const href = link.getAttribute("href");

    // Skip parent toggles and empty links
    if (!href || href.startsWith("#")) return;

    const linkPage = href.split("/").pop().toLowerCase();

    if (linkPage === currentPage) {

      // Activate the current page link
      link.classList.add("active");

      /* ===============================
         LEARNERS CHILD PAGE
      =============================== */
      if (learnersSubmenu && learnersSubmenu.contains(link)) {
        if (learnersToggle) {
          learnersToggle.classList.add("active");
          learnersToggle.setAttribute("aria-expanded", "true");
        }
        learnersSubmenu.classList.add("show");
      }

      /* ===============================
         ACTIVITIES CHILD PAGE
      =============================== */
      if (activitySubmenu && activitySubmenu.contains(link)) {
        if (activityToggle) {
          activityToggle.classList.add("active");
          activityToggle.setAttribute("aria-expanded", "true");
        }
        activitySubmenu.classList.add("show");
      }
    }
  });

}