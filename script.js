// Mobile menu toggle
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Dark mode toggle
function darkMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

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

// Project data and rendering
let projectsData = [];
let currentProjectImages = [];
let currentSlideIndex = 0;

async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        projectsData = await response.json();
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects() {
    const container = document.getElementById('projects-container');
    container.innerHTML = '';

    projectsData.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'details-container color-container project-card';
        projectCard.onclick = () => openModal(project.id);

        const primaryImage = project.images && project.images.length > 0 
            ? project.images[0] 
            : './assets/placeholder.png';

        projectCard.innerHTML = `
            <div class="article-container">
                <img 
                    src="${primaryImage}" 
                    alt="${project.title} screenshot"
                    class="project-img"
                    onerror="this.src='./assets/placeholder.png'"
                />
            </div>
            <h2 class="experience-sub-title project-title">${project.title}</h2>
            <p class="project-short-desc">${project.shortDescription}</p>
            <div class="project-tech">
                ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.repoUrl}" class="btn btn-color-2 project-btn" onclick="event.stopPropagation()">
                    <i class="fab fa-github"></i> GitHub
                </a>
                ${project.liveUrl ? `
                    <a href="${project.liveUrl}" class="btn btn-color-2 project-btn" onclick="event.stopPropagation()">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                ` : ''}
            </div>
        `;

        container.appendChild(projectCard);
    });
}

function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    currentProjectImages = project.images && project.images.length > 0 
        ? project.images 
        : ['./assets/placeholder.png'];
    currentSlideIndex = 0;

    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.longDescription;

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

    const repoLink = document.getElementById('modal-repo');
    repoLink.href = project.repoUrl;

    const liveLink = document.getElementById('modal-live');
    if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.style.display = 'inline-flex';
    } else {
        liveLink.style.display = 'none';
    }

    renderCarousel();

    const modal = document.getElementById('project-modal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function renderCarousel() {
    const track = document.getElementById('modal-carousel-track');
    track.innerHTML = '';

    currentProjectImages.forEach((img, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === currentSlideIndex ? 'active' : ''}`;
        slide.innerHTML = `<img src="${img}" alt="Project screenshot" onerror="this.src='./assets/placeholder.png'">`;
        track.appendChild(slide);
    });
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = currentProjectImages.length - 1;
    if (currentSlideIndex >= currentProjectImages.length) currentSlideIndex = 0;
    renderCarousel();
}

window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target === modal) {
        closeModal();
    }
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
    if (document.getElementById('project-modal').style.display === 'flex') {
        if (event.key === 'ArrowLeft') changeSlide(-1);
        if (event.key === 'ArrowRight') changeSlide(1);
    }
});

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', loadProjects);
