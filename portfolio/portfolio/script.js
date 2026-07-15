console.log("Portfolio V3 Started 🚀");

// Typing Effect

const words = [

    "Frontend Developer",

    "Web Designer",

    "JavaScript Developer",

    "MCA Student"

];

let wordIndex = 0;

let charIndex = 0;

let currentWord = "";

let isDeleting = false;

const typing = document.getElementById("typing");

function type(){

    currentWord = words[wordIndex];

    if(!isDeleting){

        typing.textContent = currentWord.substring(0,charIndex++);

        if(charIndex > currentWord.length){

            isDeleting = true;

            setTimeout(type,1000);

            return;

        }

    }

    else{

        typing.textContent = currentWord.substring(0,charIndex--);

        if(charIndex===0){

            isDeleting=false;

            wordIndex++;

            if(wordIndex===words.length){

                wordIndex=0;

            }

        }

    }

    setTimeout(type,isDeleting?60:120);

}

type();

// Scroll Progress

window.addEventListener("scroll",()=>{

    const scrollTop=window.scrollY;

    const pageHeight=document.documentElement.scrollHeight-window.innerHeight;

    const progress=(scrollTop/pageHeight)*100;

    document.getElementById("progress-bar").style.width=progress+"%";

});


// Scroll Reveal

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    const windowHeight = window.innerHeight;

    reveals.forEach(section=>{

        const top = section.getBoundingClientRect().top;

        if(top < windowHeight - 100){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();

// Cursor Glow

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

/*=========================
 Animated Counter
=========================*/

const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let count = 0;

        const speed = target / 40;

        const update = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target;

            }

        };

        update();

    });

};

const aboutSection = document.querySelector("#about");

let counterStarted = false;

window.addEventListener("scroll", () => {

    const top = aboutSection.getBoundingClientRect().top;

    if (top < window.innerHeight - 100 && !counterStarted) {

        startCounter();

        counterStarted = true;

    }

});

/*=========================
 PROJECT FILTER
=========================*/

const filterButtons = document.querySelectorAll(".filter-btn");

const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        projectCards.forEach(card=>{

            if(filter==="all" || card.dataset.category===filter){

                card.style.display="block";

            }

            else{

                card.style.display="none";

            }

        });

    });

});

/*=========================
BACK TO TOP
=========================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 400){

    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";

}else{

    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";

}

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================
THEME TOGGLE
=========================*/

const themeToggle = document.getElementById("themeToggle");

// Saved theme load karo
if(localStorage.getItem("theme") === "light"){

    document.body.classList.add("light-theme");

    themeToggle.textContent = "☀️";

}

themeToggle.addEventListener("click",()=>{

    document.body.classList.toggle("light-theme");

    if(document.body.classList.contains("light-theme")){

        localStorage.setItem("theme","light");

        themeToggle.textContent="☀️";

    }

    else{

        localStorage.setItem("theme","dark");

        themeToggle.textContent="🌙";

    }

});

/*=========================
ACTIVE NAVBAR
=========================*/

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});

/*=========================
MOBILE MENU
=========================*/

const menuToggle = document.querySelector(".menu-toggle");

const nav = document.querySelector("nav");

menuToggle.addEventListener("click",()=>{

    nav.classList.toggle("active");

    menuToggle.textContent =

    nav.classList.contains("active")

    ? "✖"

    : "☰";

});