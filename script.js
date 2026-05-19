/**
 * Aura AI — Advanced Core User Experience Engine
 * Handles interface tracking, calculations, layouts, and system rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initScrollProgressBar();
    initCustomCursor();
    initBackgroundParticles();
    initStickyNavbar();
    initMobileNavigation();
    initScrollRevealAnimation();
    initNumericalCounterEngine();
    initFaqAccordionLogic();
    initCardPerspectiveHoverEffect();
    initButtonRippleSystem();
    initThemeToggleEngine();
    initParallaxEngine();
});

/* ==========================================================================
   1. System Engine Preloader
   ========================================================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 400); // Maps directly to CSS normal speed token
        });
    }
}

/* ==========================================================================
   2. Scroll Progress Bar Monitor
   ========================================================================== */
function initScrollProgressBar() {
    const progressBar = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (progressBar) progressBar.style.width = scrolled + '%';
    });
}

/* ==========================================================================
   3. Custom Smooth Interactive Cursor Tracker
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    if (!cursor || window.matchMedia('(pointer: coarse)').matches) return; // Terminate if running on a touch screen interface

    // Make element visible upon registering initial motion activity
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    // Detect high importance hover nodes to scale up cursor wrapper graphic
    const interactiveTargets = document.querySelectorAll('a, button, .interactive-card, .accordion-header');
    interactiveTargets.forEach(target => {
        target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });
}

/* ==========================================================================
   4. Floating Canvas Particle Network Generator
   ========================================================================== */
function initBackgroundParticles() {
    const container = document.getElementById('particleContainer');
    if (!container) return;

    const maxParticles = 25; // Optimized ceiling target to preserve GPU memory allocation
    for (let i = 0; i < maxParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize placement attributes across window matrix bounds
        const size = Math.random() * 6 + 2; // Size scale variations
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        container.appendChild(particle);
        animateSingleParticle(particle);
    }
}

function animateSingleParticle(particle) {
    const duration = Math.random() * 20000 + 10000; // Multi-second transformation timeline loops
    const targetX = (Math.random() - 0.5) * 200;
    const targetY = (Math.random() - 0.5) * 200;

    const animation = particle.animate([
        { transform: 'translate(0, 0)', opacity: 0.1 },
        { opacity: 0.3, offset: 0.5 },
        { transform: `translate(${targetX}px, ${targetY}px)`, opacity: 0.1 }
    ], {
        duration: duration,
        iterations: Infinity,
        easing: 'ease-in-out'
    });
}

/* ==========================================================================
   5. Dynamic Header Scroll Controller
   ========================================================================== */
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        // Toggle background state properties upon scrolling downstream
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            if(backToTop) backToTop.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            if(backToTop) backToTop.classList.remove('show');
        }

        // Active Viewport Section Link Tracker
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Account for visual head buffer offset
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top structural event listener click bind
    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

/* ==========================================================================
   6. Mobile Sidebar Navigation Drawer System
   ========================================================================== */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger || !navMenu) return;

    const toggleMobileMenu = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body layer scrolling beneath active mobile navigation overlay
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : 'auto';
    };

    hamburger.addEventListener('click', toggleMobileMenu);

    // Auto close overlay panel upon committing user redirection route click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) toggleMobileMenu();
        });
    });
}

/* ==========================================================================
   7. Scroll Intersection Observer Reveal System
   ========================================================================== */
function initScrollRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Kill tracking cycles once rendered
            }
        });
    }, {
        root: null,
        threshold: 0.15 // Render once 15% visibility scale cross section is matched
    });

    revealElements.forEach(element => revealObserver.observe(element));
}

/* ==========================================================================
   8. High-Performance Asynchronous Numerical Counter Engine
   ========================================================================== */
function initNumericalCounterEngine() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetElement = entry.target;
                const finalTargetVal = parseInt(targetElement.getAttribute('data-target'), 10);
                animateCounter(targetElement, finalTargetVal);
                observer.unobserve(targetElement);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));
}

function animateCounter(element, targetValue) {
    let currentCountValue = 0;
    const animationDuration = 2000; // Measured in global ms units
    const stepIncrementTime = Math.min(Math.ceil(animationDuration / targetValue), 30);
    
    const counterTimer = setInterval(() => {
        currentCountValue += Math.ceil(targetValue / (animationDuration / stepIncrementTime));
        if (currentCountValue >= targetValue) {
            element.textContent = targetValue + (targetValue === 99 ? '%' : '+');
            clearInterval(counterTimer);
        } else {
            element.textContent = currentCountValue;
        }
    }, stepIncrementTime);
}

/* ==========================================================================
   9. Clean Accordion Logic System
   ========================================================================== */
function initFaqAccordionLogic() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const isCurrentlyActive = currentItem.classList.contains('active');
            
            // Loop and clear active styling across non-selected accordion instances
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // If selected item wasn't open, toggle its structural visibility state open
            if (!isCurrentlyActive) {
                currentItem.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   10. Interactive 3D Card Hover Perspective Tracker
   ========================================================================== */
function initCardPerspectiveHoverEffect() {
    const interactiveCards = document.querySelectorAll('.interactive-card');
    
    if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on lower-performance touch interfaces

    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;
            
            // Map spatial inputs to layout center coordination weights
            const xPercent = (mouseX / bounds.width) - 0.5;
            const yPercent = (mouseY / bounds.height) - 0.5;
            
            // Configure subtle rotation weight transformations 
            card.style.transform = `perspective(1000px) rotateX(${yPercent * -8}deg) rotateY(${xPercent * 8}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   11. Vanilla Material Button Ripple Systems
   ========================================================================== */
function initButtonRippleSystem() {
    const rippleButtons = document.querySelectorAll('.btn-ripple');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const clientBounds = this.getBoundingClientRect();
            const rippleX = e.clientX - clientBounds.left;
            const rippleY = e.clientY - clientBounds.top;

            const rippleCircleElement = document.createElement('span');
            rippleCircleElement.classList.add('ripple');
            rippleCircleElement.style.left = `${rippleX}px`;
            rippleCircleElement.style.top = `${rippleY}px`;

            this.appendChild(rippleCircleElement);

            // Clean ripple instances immediately following execution cycle ends
            setTimeout(() => rippleCircleElement.remove(), 600);
        });
    });
}

/* ==========================================================================
   12. Centralized LocalStorage Theme State Managers
   ========================================================================== */
function initThemeToggleEngine() {
    const themeToggleBtn = document.getElementById('themeToggle');
    if (!themeToggleBtn) return;

    const retainedUserThemeSelection = localStorage.getItem('aura-theme-selection');
    
    // Apply layout state rules derived from historical local choices
    if (retainedUserThemeSelection === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        const structuralActiveTheme = document.documentElement.getAttribute('data-theme');
        
        if (structuralActiveTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('aura-theme-selection', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('aura-theme-selection', 'light');
        }
    });
}

/* ==========================================================================
   13. Lightweight Mathematical Parallax Elements Controller
   ========================================================================== */
function initParallaxEngine() {
    const elementsToOffset = document.querySelectorAll('.parallax-element');
    if (window.matchMedia('(pointer: coarse)').matches) return; // Prevent performance dips across small form factor mobile setups

    window.addEventListener('scroll', () => {
        const scrollDeltaY = window.scrollY;
        elementsToOffset.forEach(node => {
            const translationalVelocityValue = parseFloat(node.getAttribute('data-speed'));
            // Offset positioning along vertical baseline parameters tracking real velocity
            node.style.transform = `translateY(${scrollDeltaY * translationalVelocityValue}px)`;
        });
    });
}