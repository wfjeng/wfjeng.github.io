// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Hero Slideshow
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevButton = document.querySelector('.hero-arrow-left');
    const nextButton = document.querySelector('.hero-arrow-right');
    let currentSlide = 0;
    let slideInterval;
    const slideDelay = 5000; // 5 seconds

    function showSlide(index, direction = 'next') {
        const oldSlide = currentSlide;
        
        // Remove active class from current slide and dot
        slides[oldSlide].classList.remove('active');
        dots[oldSlide].classList.remove('active');

        // Add exit animation class based on direction
        if (direction === 'next') {
            slides[oldSlide].classList.add('slide-out-left');
        } else {
            slides[oldSlide].classList.add('slide-out-right');
        }

        // Update current slide index
        currentSlide = index;

        // Position new slide to enter from opposite side
        if (direction === 'next') {
            slides[currentSlide].classList.add('slide-in-right');
        } else {
            slides[currentSlide].classList.add('slide-in-left');
        }

        // Force reflow to ensure transition works
        slides[currentSlide].offsetHeight;

        // Remove positioning class and add active to trigger animation
        slides[currentSlide].classList.remove('slide-in-right', 'slide-in-left');
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Clean up old slide classes after transition
        setTimeout(() => {
            slides[oldSlide].classList.remove('slide-out-left', 'slide-out-right');
        }, 600); // Match transition duration
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next, 'next');
    }

    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev, 'prev');
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, slideDelay);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Navigation arrows
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            stopSlideshow();
            nextSlide();
            startSlideshow();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            stopSlideshow();
            prevSlide();
            startSlideshow();
        });
    }

    // Navigation dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            const direction = index > currentSlide ? 'next' : 'prev';
            showSlide(index, direction);
            startSlideshow();
        });
    });

    // Pause slideshow on hover
    // const heroSection = document.querySelector('.hero');
    // if (heroSection) {
    //     heroSection.addEventListener('mouseenter', stopSlideshow);
    //     heroSection.addEventListener('mouseleave', startSlideshow);
    // }

    // Keyboard navigation
    // document.addEventListener('keydown', (e) => {
    //     if (e.key === 'ArrowLeft') {
    //         stopSlideshow();
    //         prevSlide();
    //         startSlideshow();
    //     } else if (e.key === 'ArrowRight') {
    //         stopSlideshow();
    //         nextSlide();
    //         startSlideshow();
    //     }
    // });

    // Start the slideshow
    if (slides.length > 0) {
        startSlideshow();
    }

    // // Mobile Navigation
    // const navToggle = document.querySelector('.nav-toggle');
    // const navMenu = document.querySelector('.nav-menu');
    // const navLinks = document.querySelectorAll('.nav-link');
    //
    // // Toggle mobile menu
    // navToggle.addEventListener('click', function() {
    //     navToggle.classList.toggle('active');
    //     navMenu.classList.toggle('active');
    // });
    //
    // // Close mobile menu when clicking on nav links
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function() {
    //         navToggle.classList.remove('active');
    //         navMenu.classList.remove('active');
    //     });
    // });
    //
    // // Smooth scrolling for anchor links
    // navLinks.forEach(link => {
    //     link.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetSection = document.querySelector(targetId);
    //
    //         if (targetSection) {
    //             const headerHeight = document.querySelector('.header').offsetHeight;
    //             const targetPosition = targetSection.offsetTop - headerHeight;
    //
    //             window.scrollTo({
    //                 top: targetPosition,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });


    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Add animation to about features
    const aboutFeatures = document.querySelectorAll('.feature');
    aboutFeatures.forEach((feature, index) => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(30px)';
        feature.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(feature);
    });

    // Add animation to project section
    const projectInfo = document.querySelector('.project-info');
    const projectImage = document.querySelector('.project-image');
    if (projectInfo) {
        projectInfo.style.opacity = '0';
        projectInfo.style.transform = 'translateX(30px)';
        projectInfo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(projectInfo);
    }
    if (projectImage) {
        projectImage.style.opacity = '0';
        projectImage.style.transform = 'translateX(-30px)';
        projectImage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(projectImage);
    }
});