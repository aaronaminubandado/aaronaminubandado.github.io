function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// function darkMode() {
//     var element = document.body;
//     element.classList.toggle("dark-mode");
// }

function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    // Toggle dark mode on other elements if needed
    var nav = document.querySelector('nav');
    var footer = document.querySelector('footer');
    var navLinks = document.querySelectorAll('.nav-links a');
    var detailsContainers = document.querySelectorAll('.details-container');
    var colorContainers = document.querySelectorAll('.color-container');
    var aboutPics = document.querySelectorAll('.about-pic');
    var buttons = document.querySelectorAll('.btn');
    var icons = document.querySelectorAll('.icon');
    var contactContainers = document.querySelectorAll('.contact-info-upper-container');
    var hamburgerNav = document.querySelector('#hamburger-nav');
    var hamburgerIconSpans = document.querySelectorAll('.hamburger-icon span');
    var menuLinks = document.querySelectorAll('.menu-links a');
    var darkModeIcon = document.querySelectorAll('.menu-links li');

    nav.classList.toggle("dark-mode");
    footer.classList.toggle("dark-mode");

    navLinks.forEach(link => link.classList.toggle("dark-mode"));
    detailsContainers.forEach(container => container.classList.toggle("dark-mode"));
    colorContainers.forEach(container => container.classList.toggle("dark-mode"));
    aboutPics.forEach(pic => pic.classList.toggle("dark-mode"));
    buttons.forEach(button => button.classList.toggle("dark-mode"));
    icons.forEach(icon => icon.classList.toggle("dark-mode"));
    contactContainers.forEach(container => container.classList.toggle("dark-mode"));
    hamburgerNav.classList.toggle("dark-mode");
    hamburgerIconSpans.forEach(span => span.classList.toggle("dark-mode"));
    menuLinks.forEach(link => link.classList.toggle("dark-mode"));
}
