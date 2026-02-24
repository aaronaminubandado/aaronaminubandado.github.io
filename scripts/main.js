/**
 * Portfolio Main JavaScript
 * Handles: Navigation, Theme Toggle, Projects Rendering, Modal with Carousel
 */

(function() {
    'use strict';

    // ========================================
    // State
    // ========================================
    
    let projectsData = [];
    let currentProject = null;
    let currentSlideIndex = 0;
    let lastFocusedElement = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // ========================================
    // DOM Elements
    // ========================================
    
    const elements = {
        // Navigation
        hamburger: document.getElementById('hamburger'),
        mobileNav: document.getElementById('mobile-nav'),
        
        // Theme
        themeToggle: document.getElementById('theme-toggle'),
        
        // Projects
        projectsGrid: document.getElementById('projects-grid'),
        
        // Modal
        modalOverlay: document.getElementById('modal-overlay'),
        modalClose: document.getElementById('modal-close'),
        carouselTrack: document.getElementById('carousel-track'),
        carouselIndicators: document.getElementById('carousel-indicators'),
        carouselPrev: document.getElementById('carousel-prev'),
        carouselNext: document.getElementById('carousel-next'),
        modalTitle: document.getElementById('modal-title'),
        modalDescription: document.getElementById('modal-description'),
        modalTech: document.getElementById('modal-tech'),
        modalRepo: document.getElementById('modal-repo'),
        modalLive: document.getElementById('modal-live'),
        focusTrapStart: document.getElementById('focus-trap-start'),
        focusTrapEnd: document.getElementById('focus-trap-end')
    };

    // ========================================
    // Initialization
    // ========================================
    
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initNavigation();
        initTheme();
        initLazyLoading();
        loadProjects();
    }

    // ========================================
    // Navigation
    // ========================================
    
    function initNavigation() {
        if (!elements.hamburger || !elements.mobileNav) return;

        elements.hamburger.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu on link click
        const mobileLinks = elements.mobileNav.querySelectorAll('.nav-mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && elements.mobileNav.hidden === false) {
                closeMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        const isExpanded = elements.hamburger.getAttribute('aria-expanded') === 'true';
        elements.hamburger.setAttribute('aria-expanded', !isExpanded);
        elements.mobileNav.hidden = isExpanded;
        
        if (!isExpanded) {
            const firstLink = elements.mobileNav.querySelector('.nav-mobile-link');
            if (firstLink) firstLink.focus();
        }
    }

    function closeMobileMenu() {
        elements.hamburger.setAttribute('aria-expanded', 'false');
        elements.mobileNav.hidden = true;
        elements.hamburger.focus();
    }

    // ========================================
    // Theme Toggle
    // ========================================
    
    function initTheme() {
        if (!elements.themeToggle) return;

        // Check for saved preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
        }

        elements.themeToggle.addEventListener('click', toggleTheme);
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // ========================================
    // Lazy Loading
    // ========================================
    
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            img.classList.add('loaded');
                        }
                        observer.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            });
        }
    }

    // ========================================
    // Projects Data
    // ========================================
    
    async function loadProjects() {
        try {
            const response = await fetch('./data/projects.json');
            if (!response.ok) throw new Error('Failed to load projects');
            projectsData = await response.json();
            renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
            showProjectsError();
        }
    }

    function renderProjects() {
        if (!elements.projectsGrid) return;
        
        elements.projectsGrid.innerHTML = projectsData.map(project => {
            const primaryImage = project.images && project.images.length > 0 
                ? project.images[0] 
                : './assets/placeholder.png';

            return `
                <article 
                    class="project-card" 
                    data-project-id="${project.id}"
                    tabindex="0"
                    role="button"
                    aria-label="View ${project.title} project details"
                >
                    <div class="project-image-wrapper">
                        <img 
                            class="project-image"
                            data-src="${primaryImage}"
                            alt="${project.title} project screenshot"
                            loading="lazy"
                            onerror="this.src='./assets/placeholder.png'; this.classList.add('loaded')"
                        />
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${escapeHtml(project.title)}</h3>
                        <p class="project-description">${escapeHtml(project.shortDescription)}</p>
                        <div class="project-tech">
                            ${project.tech.slice(0, 3).map(t => 
                                `<span class="project-tech-tag">${escapeHtml(t)}</span>`
                            ).join('')}
                        </div>
                        <div class="project-links">
                            <a href="${escapeHtml(project.repoUrl)}" 
                               class="project-link" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               aria-label="View ${project.title} on GitHub"
                               onclick="event.stopPropagation()">
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                Code
                            </a>
                            ${project.liveUrl ? `
                                <a href="${escapeHtml(project.liveUrl)}" 
                                   class="project-link" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="View ${project.title} live demo"
                                   onclick="event.stopPropagation()">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                                    </svg>
                                    Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Add click and keyboard handlers to project cards
        const cards = elements.projectsGrid.querySelectorAll('.project-card');
        cards.forEach(card => {
            card.addEventListener('click', () => openProjectModal(card.dataset.projectId));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProjectModal(card.dataset.projectId);
                }
            });
        });
    }

    function showProjectsError() {
        if (!elements.projectsGrid) return;
        elements.projectsGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; color: var(--color-text-muted);">
                Unable to load projects. Please try again later.
            </p>
        `;
    }

    // ========================================
    // Modal
    // ========================================
    
    function openProjectModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        if (!project) return;

        currentProject = project;
        currentSlideIndex = 0;

        // Save currently focused element
        lastFocusedElement = document.activeElement;

        // Populate modal content
        elements.modalTitle.textContent = project.title;
        elements.modalDescription.textContent = project.longDescription;
        
        // Tech stack
        elements.modalTech.innerHTML = project.tech.map(t => 
            `<span class="project-tech-tag">${escapeHtml(t)}</span>`
        ).join('');

        // Links
        elements.modalRepo.href = project.repoUrl;
        
        if (project.liveUrl) {
            elements.modalLive.href = project.liveUrl;
            elements.modalLive.style.display = 'inline-flex';
        } else {
            elements.modalLive.style.display = 'none';
        }

        // Setup carousel
        setupCarousel(project.images || ['./assets/placeholder.png']);

        // Show modal
        elements.modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Focus trap
        elements.focusTrapStart.focus();
        
        // Add event listeners
        document.addEventListener('keydown', handleModalKeydown);
    }

    function closeProjectModal() {
        elements.modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Remove event listeners
        document.removeEventListener('keydown', handleModalKeydown);
        
        // Restore focus
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
        
        currentProject = null;
    }

    function handleModalKeydown(e) {
        switch (e.key) {
            case 'Escape':
                closeProjectModal();
                break;
            case 'ArrowLeft':
                changeSlide(-1);
                break;
            case 'ArrowRight':
                changeSlide(1);
                break;
            case 'Tab':
                trapFocus(e);
                break;
        }
    }

    function trapFocus(e) {
        const focusableElements = elements.modalOverlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    // ========================================
    // Carousel
    // ========================================
    
    function setupCarousel(images) {
        const slides = images.map((img, index) => `
            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <img src="${img}" alt="Project screenshot ${index + 1}" 
                     onerror="this.src='./assets/placeholder.png'">
            </div>
        `).join('');

        const indicators = images.map((_, index) => `
            <button class="carousel-indicator ${index === 0 ? 'active' : ''}" 
                    data-index="${index}"
                    aria-label="Go to slide ${index + 1}">
            </button>
        `).join('');

        elements.carouselTrack.innerHTML = slides;
        elements.carouselIndicators.innerHTML = indicators;

        // Add indicator click handlers
        const indicatorButtons = elements.carouselIndicators.querySelectorAll('.carousel-indicator');
        indicatorButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                goToSlide(parseInt(btn.dataset.index));
            });
        });

        // Setup swipe detection
        setupSwipeDetection();
    }

    function changeSlide(direction) {
        const images = currentProject.images || ['./assets/placeholder.png'];
        currentSlideIndex += direction;
        
        if (currentSlideIndex < 0) currentSlideIndex = images.length - 1;
        if (currentSlideIndex >= images.length) currentSlideIndex = 0;
        
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlideIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        const slides = elements.carouselTrack.querySelectorAll('.carousel-slide');
        const indicators = elements.carouselIndicators.querySelectorAll('.carousel-indicator');

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentSlideIndex);
        });

        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlideIndex);
        });
    }

    function setupSwipeDetection() {
        const carousel = elements.carouselTrack.parentElement;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                changeSlide(1); // Swipe left, next slide
            } else {
                changeSlide(-1); // Swipe right, previous slide
            }
        }
    }

    // Initialize modal close handlers
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', closeProjectModal);
    }

    if (elements.carouselPrev) {
        elements.carouselPrev.addEventListener('click', () => changeSlide(-1));
    }

    if (elements.carouselNext) {
        elements.carouselNext.addEventListener('click', () => changeSlide(1));
    }

    // Close on backdrop click
    if (elements.modalOverlay) {
        elements.modalOverlay.addEventListener('click', (e) => {
            if (e.target === elements.modalOverlay) {
                closeProjectModal();
            }
        });
    }

    // ========================================
    // Utilities
    // ========================================
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

})();
