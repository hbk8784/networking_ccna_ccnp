lucide.createIcons();
hljs.highlightAll();
// gsap.registerPlugin(ScrollTrigger);

const dataCustomIcon = document.querySelectorAll("[data-custom-icon]");
dataCustomIcon.forEach((icon) => {
  if (icon.getAttribute("data-custom-icon")) {
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      "./assets/icons/" + icon.getAttribute("data-custom-icon") + ".svg",
    );

    request.setRequestHeader("Content-Type", "image/svg+xml");
    request.addEventListener("load", (event) => {
      if (event.target.status == 200) {
        const response = event.target.responseText;
        icon.innerHTML = response;
      }
    });
    request.send();
  }
});

//================== NAVBAR START =================

const navbar = document.querySelector("#navbar");
const routes = document.querySelectorAll("#navbar .nav__routes .route");
const sections = document.querySelectorAll("section");

window.onscroll = () => {
  if (window.scrollY > 100) {
    navbar.classList.add("drop");
  } else {
    navbar.classList.remove("drop");
  }

  // Remove active class from all routes first
  routes.forEach((route) => {
    route.classList.remove("active");
  });

  // Get current scroll position with offset
  const scrollPosition = window.scrollY + 150; // Adjust this value as needed

  // Find the current section
  let currentSection = null;
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section;
    }
  });

  // Add active class to the corresponding navigation link
  if (currentSection) {
    const sectionId = currentSection.getAttribute("id");
    const activeLink = document.querySelector(
      `#navbar .nav__routes a[href="#${sectionId}"]`,
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }
};

//theme Switching
const themeCheckbox = document.getElementById("theme-checkbox");
const storageKey = "theme";
if (JSON.parse(localStorage.getItem(storageKey))) {
  document.firstElementChild.setAttribute("data-theme", "dark");
  localStorage.setItem(storageKey, JSON.stringify(true));
  themeCheckbox.checked = true;
} else {
  document.firstElementChild.setAttribute("data-theme", "light");
  localStorage.setItem(storageKey, JSON.stringify(false));
  themeCheckbox.checked = false;
}
themeCheckbox.onchange = () => {
  if (themeCheckbox.checked) {
    document.firstElementChild.setAttribute("data-theme", "dark");
    localStorage.setItem(storageKey, JSON.stringify(true));
    return;
  } else {
    document.firstElementChild.setAttribute("data-theme", "light");
    localStorage.setItem(storageKey, JSON.stringify(false));
  }
};

// ================ NAVBAR END ====================

// ================ SIDEBAR START ==================

const menuBtn = document.getElementById("menu__btn");
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.getElementById("close-sidebar-btn");

menuBtn.onclick = () => {
  sidebar.classList.toggle("visible");
};

closeBtn.onclick = () => {
  sidebar.classList.remove("visible");
};
document.querySelectorAll(".sidebar .navitem").forEach((link) => {
  link.addEventListener("click", () => sidebar.classList.remove("visible"));
});
// ================ SIDEBAR END ====================

// ================ Header Start =====================

// Gsap Code - Wait for DOM to be ready
// document.addEventListener("DOMContentLoaded", function () {
//   // Header animations
//   gsap
//     .timeline({ delay: 0.5 })
//     .from("#header .points", { opacity: 0, y: -30 })
//     .from("#header .me", { opacity: 0, scale: 0.7 })
//     .from(
//       ["#header .user_info .sub__title", "#header .user_info .description"],
//       { opacity: 0, y: 20, stagger: 0.15 },
//     )
//     .from("#header .user_info .title", { opacity: 0, x: -30 })
//     .from("#header .user_info .buttons", { opacity: 0, x: -30 })
//     .from("#header .point", { opacity: 0, x: -30, stagger: 0.5 });

// ================ Header ends ======================

// ================ About Start =====================

// gsap
//   .timeline({
//     delay: 0.5,
//     scrollTrigger: {
//       trigger: "#about",
//       start: "top bottom",
//       end: "bottom top",
//     },
//   })
//   .from("#about .box", { opacity: 0, y: 30, stagger: 0.5 });

// ================ About End =====================

// ==================== Service Start ===============
// gsap
//   .timeline({
//     delay: 0.5,
//     scrollTrigger: {
//       trigger: "#services",
//       start: "top bottom",
//       end: "bottom top",
//     },
//   })
//   .from(
//     [
//       "#services .section__header .sub__title",
//       "#services .section__header .description",
//     ],
//     { opacity: 0, y: 30, stagger: 0.5 },
//   )
//   .from("#services .service", { opacity: 0, y: 30, stagger: 0.5 });
// ==================== Service End ===============

// ================== Project Start =====================
// gsap
//   .timeline({
//     delay: 0.5,
//     scrollTrigger: {
//       trigger: "#projects",
//       start: "top bottom",
//       end: "bottom top",
//     },
//   })
//   .from(
//     [
//       "#projects .section__header .sub__title",
//       "#projects .section__header .description",
//     ],
//     { opacity: 0, y: 30, stagger: 0.5 },
//   )
//   .from("#projects .project", { opacity: 0, y: 30, stagger: 0.5 });

// ================== Project End =====================

//================ Contact start =====================

//   gsap
//     .timeline({
//       delay: 0.5,
//       scrollTrigger: {
//         trigger: "#contact",
//         start: "top bottom",
//         end: "bottom top",
//       },
//     })
//     .from("#contact .box", { opacity: 0, y: 30, stagger: 0.5 })
//     .from("#contact .contact__form", { opacity: 0, x: 30 });

//   //================ Contact End =====================
// });

// ======================== Toast =========================

async function createToast(
  msg,
  options = { title: "", varient: "info", duration: 5000 },
) {
  if (!msg) {
    return;
  }

  const { varient = "info", duration = 5000 } = options;

  async function findIcon(name) {
    const response = await fetch(`./assets/icons/${name}.svg`, {
      method: "GET",
      "Content-Type": "image/svg+xml",
    });

    return await response.text();
  }

  const icon = await findIcon(
    varient == "success" ? "correct" : varient == "info" ? "info" : "cross",
  );

  const container = document.querySelector("#toast-container");

  const toast = document.createElement("div");

  toast.className = `toast type-${varient}`;

  toast.innerHTML = ` <div class="icon" aria-hidden="true">${icon || "ℹ️"}</div>
      <div class="content">
        <div class="message">${msg}</div>
      </div>
      
    `;

  container.appendChild(toast);

  setTimeout(() => {
    container.removeChild(toast);
  }, duration);
}

// ========================= Toast End ==================================

// ======================== Submit Button ===========================

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const fullName =
    `${formData.get("firstname")} ${formData.get("lastname")}`.trim();
  const email = formData.get("email");
  const phone = formData.get("phone") || "Not provided";
  const message = formData.get("message");
  const subject = `Portfolio enquiry from ${fullName}`;
  const body = `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;

  const mailtoUrl = `mailto:hb8784@gmail.com?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

// ======================== Submit Button End =======================
