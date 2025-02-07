// Get DOM elements
const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const emptyArea = document.getElementById("emptyarea");
const mobileToggleMenu = document.getElementById("mobiletogglemenu");
const myButton = document.getElementById("backtotopbutton");
const Pupils = document.getElementsByClassName("footer-pupil");
const pupilsArr = Array.from(Pupils);
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobileNavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

let pupilStartPoint = -10;
let pupilRangeX = 20;
let pupilRangeY = 15;
let mouseXStartPoint = 0;
let mouseXEndPoint = window.innerWidth;
let mouseXRange = mouseXEndPoint - mouseXStartPoint;
let mouseYEndPoint = window.innerHeight;
let currentXPosition = 0;
let currentYPosition = 0;
let fracXValue = 0;
let fracYValue = 0;

// Toggle settings container
function settingToggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
    document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

// Play/Pause audio based on switch
function playPause() {
    const soundSwitch = document.getElementById("switchforsound");
    soundSwitch.checked ? audio.play() : audio.pause();
}

// Toggle visual mode
function visualMode() {
    document.body.classList.toggle("light-mode");
    document.querySelectorAll(".needtobeinvert").forEach(element => {
        element.classList.toggle("invertapplied");
    });
}

// Hide preloader and show popup on load
window.addEventListener("load", () => {
    loader.style.display = "none";
    document.querySelector(".hey").classList.add("popup");
});

// Hamburger menu toggle
function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    mobileToggleMenu.classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

// Hide menu by clicking list item
function hideMenuByLi() {
    document.body.classList.toggle("stopscrolling");
    mobileToggleMenu.classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// Scroll event for section highlighting
window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }
    });

    navLi.forEach(li => {
        li.classList.remove("activeThistab");
        if (li.classList.contains(currentSection)) {
            li.classList.add("activeThistab");
        }
    });

    mobileNavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(currentSection)) {
            li.classList.add("activeThismobiletab");
        }
    });
});

// Back to top button
function scrollFunction() {
    myButton.style.display = (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) ? "block" : "none";
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.onscroll = function () {
    scrollFunction();
};

// Prevent context menu on images
document.addEventListener("contextmenu", function (event) {
    if (event.target.nodeName === "IMG") {
        event.preventDefault();
    }
}, false);

// Pupil movement based on mouse position
const mouseMove = event => {
    fracXValue = (currentXPosition = event.clientX - mouseXStartPoint) / mouseXRange;
    fracYValue = (currentYPosition = event.clientY) / mouseYEndPoint;
    const translateX = pupilStartPoint + fracXValue * pupilRangeX;
    const translateY = pupilStartPoint + fracYValue * pupilRangeY;

    pupilsArr.forEach(pupil => {
        pupil.style.transform = `translate(${translateX}px, ${translateY}px)`;
    });
};

const windowResize = () => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
};

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", windowResize);

// Console log message
console.log("%c Designed and Developed by Vinod Jangid ", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white; font-weight: 900; font-size: 1rem; padding: 20px;");
