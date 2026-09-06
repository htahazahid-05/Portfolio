// ========================================
// ELEMENTS
// ========================================

const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const revealElements = document.querySelectorAll(".reveal");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");


// ========================================
// CURRENT YEAR
// ========================================

currentYear.textContent = new Date().getFullYear();


// ========================================
// HEADER SCROLL EFFECT
// ========================================

function handleHeaderScroll() {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();


// ========================================
// MOBILE MENU
// ========================================

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const isOpen =
        navMenu.classList.contains("open");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen
    );

    menuToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';

});


// Close mobile menu when link is clicked

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    });

});


// ========================================
// ACTIVE NAVIGATION LINK
// ========================================

const sections =
    document.querySelectorAll("main section[id]");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation
);


// ========================================
// SCROLL REVEAL
// ========================================

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// ========================================
// TESTIMONIAL SLIDER
// ========================================

const testimonialTrack =
    document.getElementById(
        "testimonialTrack"
    );

const testimonialCards =
    document.querySelectorAll(
        ".testimonial-card"
    );

const previousButton =
    document.getElementById(
        "previousTestimonial"
    );

const nextButton =
    document.getElementById(
        "nextTestimonial"
    );

const sliderDots =
    document.getElementById(
        "sliderDots"
    );

let currentTestimonial = 0;

let autoSlideInterval;


// Create slider dots

testimonialCards.forEach(
    (_, index) => {

        const dot =
            document.createElement("button");

        dot.classList.add("slider-dot");

        dot.setAttribute(
            "aria-label",
            `Go to testimonial ${index + 1}`
        );

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener(
            "click",
            () => {

                currentTestimonial = index;

                updateTestimonialSlider();

                restartAutoSlide();

            }
        );

        sliderDots.appendChild(dot);

    }
);


function updateTestimonialSlider() {

    testimonialTrack.style.transform =
        `translateX(-${currentTestimonial * 100}%)`;

    const dots =
        document.querySelectorAll(
            ".slider-dot"
        );

    dots.forEach(
        (dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentTestimonial
            );

        }
    );

}


function showNextTestimonial() {

    currentTestimonial++;

    if (
        currentTestimonial >=
        testimonialCards.length
    ) {
        currentTestimonial = 0;
    }

    updateTestimonialSlider();

}


function showPreviousTestimonial() {

    currentTestimonial--;

    if (currentTestimonial < 0) {

        currentTestimonial =
            testimonialCards.length - 1;

    }

    updateTestimonialSlider();

}


nextButton.addEventListener(
    "click",
    () => {

        showNextTestimonial();

        restartAutoSlide();

    }
);


previousButton.addEventListener(
    "click",
    () => {

        showPreviousTestimonial();

        restartAutoSlide();

    }
);


// Auto slide every 5 seconds

function startAutoSlide() {

    autoSlideInterval =
        setInterval(
            showNextTestimonial,
            5000
        );

}


function restartAutoSlide() {

    clearInterval(autoSlideInterval);

    startAutoSlide();

}


startAutoSlide();


// Stop automatic sliding while hovering

const testimonialWrapper =
    document.querySelector(
        ".testimonial-wrapper"
    );

testimonialWrapper.addEventListener(
    "mouseenter",
    () => {

        clearInterval(
            autoSlideInterval
        );

    }
);

testimonialWrapper.addEventListener(
    "mouseleave",
    startAutoSlide
);


// ========================================
// CERTIFICATE MODAL
// ========================================

const certificateButtons =
    document.querySelectorAll(
        ".view-certificate"
    );

const certificateModal =
    document.getElementById(
        "certificateModal"
    );

const modalImage =
    document.getElementById(
        "modalImage"
    );

const modalTitle =
    document.getElementById(
        "modalTitle"
    );

const modalClose =
    document.getElementById(
        "modalClose"
    );

const modalOverlay =
    document.querySelector(
        ".modal-overlay"
    );


function openCertificateModal(button) {

    const image =
        button.dataset.image;

    const title =
        button.dataset.title;

    modalImage.src = image;

    modalTitle.textContent = title;

    certificateModal.classList.add(
        "active"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "no-scroll"
    );

}


function closeCertificateModal() {

    certificateModal.classList.remove(
        "active"
    );

    certificateModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "no-scroll"
    );

}


certificateButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                openCertificateModal(
                    button
                );

            }
        );

    }
);


modalClose.addEventListener(
    "click",
    closeCertificateModal
);


modalOverlay.addEventListener(
    "click",
    closeCertificateModal
);


// Close modal with Escape key

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            certificateModal.classList.contains(
                "active"
            )
        ) {
            closeCertificateModal();
        }

    }
);


// ========================================
// CONTACT FORM VALIDATION
// ========================================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const submitButton =
    document.getElementById(
        "submitButton"
    );

const formStatus =
    document.getElementById(
        "formStatus"
    );


function showInputError(
    input,
    message
) {

    const formGroup =
        input.closest(
            ".form-group"
        );

    const errorMessage =
        formGroup.querySelector(
            ".error-message"
        );

    formGroup.classList.add(
        "error"
    );

    errorMessage.textContent =
        message;

}


function clearInputError(input) {

    const formGroup =
        input.closest(
            ".form-group"
        );

    const errorMessage =
        formGroup.querySelector(
            ".error-message"
        );

    formGroup.classList.remove(
        "error"
    );

    errorMessage.textContent = "";

}


function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


function validateForm() {

    const name =
        document.getElementById(
            "name"
        );

    const email =
        document.getElementById(
            "email"
        );

    const subject =
        document.getElementById(
            "subject"
        );

    const message =
        document.getElementById(
            "message"
        );

    let isValid = true;


    // Name

    if (
        name.value.trim().length < 2
    ) {

        showInputError(
            name,
            "Please enter at least 2 characters."
        );

        isValid = false;

    } else {

        clearInputError(name);

    }


    // Email

    if (
        !validateEmail(
            email.value.trim()
        )
    ) {

        showInputError(
            email,
            "Please enter a valid email address."
        );

        isValid = false;

    } else {

        clearInputError(email);

    }


    // Subject

    if (
        subject.value.trim().length < 3
    ) {

        showInputError(
            subject,
            "Subject must contain at least 3 characters."
        );

        isValid = false;

    } else {

        clearInputError(subject);

    }


    // Message

    if (
        message.value.trim().length < 10
    ) {

        showInputError(
            message,
            "Message must contain at least 10 characters."
        );

        isValid = false;

    } else {

        clearInputError(message);

    }


    return isValid;

}


// Remove errors while typing

const formInputs =
    contactForm.querySelectorAll(
        "input, textarea"
    );

formInputs.forEach((input) => {

    input.addEventListener(
        "input",
        () => {

            clearInputError(input);

            formStatus.textContent = "";

        }
    );

});


// Submit

contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        formStatus.className =
            "form-status";

        formStatus.textContent = "";


        if (!validateForm()) {

            formStatus.textContent =
                "Please correct the highlighted fields.";

            formStatus.classList.add(
                "error"
            );

            return;

        }


        submitButton.classList.add(
            "loading"
        );

        submitButton.innerHTML =
            `
            <span>Sending...</span>
            <i class="fa-solid fa-spinner fa-spin"></i>
            `;


        /*
            This is currently a frontend demo.

            Later you can connect:
            - Formspree
            - EmailJS
            - Web3Forms
            - Your own backend/API
        */


        setTimeout(() => {

            submitButton.classList.remove(
                "loading"
            );

            submitButton.innerHTML =
                `
                <span>Send Message</span>
                <i class="fa-solid fa-paper-plane"></i>
                `;


            formStatus.textContent =
                "Your message has been submitted successfully!";

            formStatus.classList.add(
                "success"
            );


            contactForm.reset();


            setTimeout(() => {

                formStatus.textContent = "";

            }, 5000);


        }, 1200);

    }
);


// ========================================
// BACK TO TOP
// ========================================

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 600) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }
);


backToTop.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ========================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// ========================================

document.addEventListener(
    "click",
    (event) => {

        const clickedInsideMenu =
            navMenu.contains(
                event.target
            );

        const clickedToggle =
            menuToggle.contains(
                event.target
            );

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains(
                "open"
            )
        ) {

            navMenu.classList.remove(
                "open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }
);