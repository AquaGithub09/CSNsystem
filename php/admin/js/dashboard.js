
const sidebar = document.getElementById("adminSidebar");
const sidebarToggle =
    document.getElementById("sidebarToggle");
const sidebarClose =
    document.getElementById("sidebarClose");
const sidebarOverlay =
    document.getElementById("sidebarOverlay");

function openSidebar() {

    sidebar.classList.add("show");

    sidebarOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closeSidebar() {

    sidebar.classList.remove("show");

    sidebarOverlay.classList.remove("show");

    document.body.style.overflow = "";

}

if (sidebarToggle) {

    sidebarToggle.addEventListener(
        "click",
        openSidebar
    );

}

if (sidebarClose) {

    sidebarClose.addEventListener(
        "click",
        closeSidebar
    );

}

if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}

const navigationLinks =
    document.querySelectorAll(".navigation-link");


navigationLinks.forEach((link) => {

    link.addEventListener("click", function () {

        navigationLinks.forEach((item) => {

            item.classList.remove("active");

        });


        this.classList.add("active");


        if (window.innerWidth < 992) {

            closeSidebar();

        }

    });

});

window.addEventListener("resize", function () {

    if (window.innerWidth >= 992) {

        closeSidebar();

    }

});