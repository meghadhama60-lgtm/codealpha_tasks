// ======================
// LOADER
// ======================

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);
    }
});

// ======================
// DARK MODE
// ======================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const icon = themeToggle.querySelector("i");

        if (document.body.classList.contains("dark")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        }
    });
}

// ======================
// FILTERS
// ======================

const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        filterBtns.forEach(button =>
            button.classList.remove("active")
        );

        btn.classList.add("active");

        const filterValue = btn.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filterValue === "all" ||
                item.classList.contains(filterValue)
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });
    });
});

// ======================
// LIGHTBOX
// ======================

const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const counter = document.querySelector(".counter");

const images = document.querySelectorAll(".gallery-item img");

let currentIndex = 0;

// Open Lightbox

images.forEach((img, index) => {

    img.addEventListener("click", () => {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    });
});

// Update Image

function updateLightbox() {

    if (!lightboxImg) return;

    lightboxImg.src = images[currentIndex].src;

    if (counter) {
        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;
    }
}

// Next

if (nextBtn) {
    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateLightbox();
    });
}

// Previous

if (prevBtn) {
    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        updateLightbox();
    });
}

// Close

function closeLightbox() {

    if (lightbox) {
        lightbox.classList.remove("active");
    }

    document.body.style.overflow = "auto";
}

if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
}

// Click Outside

if (lightbox) {

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// ======================
// KEYBOARD SUPPORT
// ======================

document.addEventListener("keydown", (e) => {

    if (!lightbox || !lightbox.classList.contains("active"))
        return;

    if (e.key === "ArrowRight") {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        updateLightbox();
    }

    if (e.key === "ArrowLeft") {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        updateLightbox();
    }

    if (e.key === "Escape") {
        closeLightbox();
    }
});