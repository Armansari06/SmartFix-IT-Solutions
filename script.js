"use strict";

/* =========================
   SMARTFIX IT SOLUTIONS
   MAIN JAVASCRIPT
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("open");
        menuToggle.classList.toggle("active");
    });

    // Close menu when navigation link is clicked
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuToggle.classList.remove("active");
        });

    });
}


/* =========================
   STICKY HEADER
========================= */

const header = document.getElementById("header");

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);

updateActiveNavigation();


/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================
   CONTACT FORM
   SEND FULL DETAILS TO WHATSAPP
========================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

/*
   IMPORTANT:
   WhatsApp number must be in international format.
   No +, spaces or -
   
   Current number:
   +91 9170688077
*/

const SMARTFIX_WHATSAPP = "919170688077";


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        // IMPORTANT:
        // Stop normal form submission / page reload
        event.preventDefault();


        /* =========================
           GET FORM VALUES
        ========================= */

        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const serviceSelect = document.getElementById("service");
        const messageInput = document.getElementById("message");


        const name =
            nameInput?.value.trim() || "";

        const phone =
            phoneInput?.value.trim() || "";

        const message =
            messageInput?.value.trim() || "";


        /* =========================
           GET SELECTED SERVICE
        ========================= */

        let serviceName = "Not specified";

        if (serviceSelect) {

            const selectedOption =
                serviceSelect.options[
                    serviceSelect.selectedIndex
                ];

            if (selectedOption) {
                serviceName =
                    selectedOption.text.trim();
            }

        }


        /* =========================
           VALIDATION
        ========================= */

        if (!name) {

            showFormMessage(
                "Please enter your name.",
                "error"
            );

            nameInput?.focus();

            return;
        }


        if (!phone) {

            showFormMessage(
                "Please enter your phone number.",
                "error"
            );

            phoneInput?.focus();

            return;
        }


        if (!serviceSelect || !serviceSelect.value) {

            showFormMessage(
                "Please select a service.",
                "error"
            );

            serviceSelect?.focus();

            return;
        }


        /* =========================
           CREATE WHATSAPP MESSAGE
        ========================= */

        const whatsappMessage =
`Hello SmartFix IT Solutions 👋

I would like to request a FREE SITE SURVEY.

━━━━━━━━━━━━━━━━━━━━
CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━

👤 Name:
${name}

📞 Phone:
${phone}

🛠 Required Service:
${serviceName}

📝 Requirement:
${message || "Not mentioned"}

━━━━━━━━━━━━━━━━━━━━

Please contact me regarding this requirement.

Thank you.
SmartFix IT Solutions Website Enquiry`;


        /* =========================
           CREATE WHATSAPP URL
        ========================= */

        const whatsappURL =
            `https://wa.me/${SMARTFIX_WHATSAPP}?text=${encodeURIComponent(
                whatsappMessage
            )}`;


        /* =========================
           SHOW STATUS
        ========================= */

        showFormMessage(
            "Opening WhatsApp...",
            "success"
        );


        /* =========================
           OPEN WHATSAPP
        ========================= */

        /*
           Small delay allows the user to see
           "Opening WhatsApp..." before redirect.
        */

        setTimeout(() => {

            window.location.href = whatsappURL;

        }, 300);

    });

}


/* =========================
   FORM MESSAGE HELPER
========================= */

function showFormMessage(message, type = "success") {

    if (!formMessage) return;

    formMessage.textContent = message;

    if (type === "error") {

        formMessage.style.color = "#f87171";

    } else {

        formMessage.style.color = "#86efac";

    }

}


/* =========================
   PHONE NUMBER VALIDATION
========================= */

const phoneInput = document.getElementById("phone");

if (phoneInput) {

    phoneInput.addEventListener("input", () => {

        /*
           Allow:
           numbers
           +
           -
           spaces
           brackets
        */

        phoneInput.value =
            phoneInput.value.replace(
                /[^\d+\-\s()]/g,
                ""
            );

    });

}


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".service-card, .process-step, .project-card, .feature, .contact-form-wrapper"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        revealObserver.observe(element);

    });

}


/* =========================
   ESCAPE KEY
   CLOSE MOBILE MENU
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        if (navbar) {
            navbar.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.classList.remove("active");
        }

    }

});


/* =========================
   PREVENT EMPTY ANCHOR JUMP
========================= */

document
    .querySelectorAll('a[href="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });


/* =========================
   CONSOLE BRAND MESSAGE
========================= */

console.log(
    "%cSmartFix IT Solutions",
    "color:#38bdf8;font-size:20px;font-weight:bold;"
);

console.log(
    "%cCCTV • Networking • Structured Cabling • IT Infrastructure",
    "color:#94a3b8;font-size:12px;"
);
