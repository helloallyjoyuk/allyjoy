// ============================================
// Ally Joy — WEBSITE JAVASCRIPT (UPGRADED)
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ===== 1. MOBILE NAVIGATION =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // NEW: Close menu automatically if window is resized to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== 2. NAVBAR SCROLL EFFECT =====
    const nav = document.getElementById('nav');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ===== 3. FADE-IN SCROLL ANIMATIONS =====
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Optional: Stop observing once it has faded in
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ===== 4. FAQ ACCORDION =====
    const faqQuestions = document.querySelectorAll('.faq__question');
    faqQuestions.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const item = btn.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other FAQs in the same category
            const category = btn.closest('.faq__grid') || btn.closest('.faq-category');
            if (category) {
                category.querySelectorAll('.faq__item').forEach(function(i) {
                    i.classList.remove('active');
                });
            }

            // Open the clicked one if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ===== 5. CONTACT FORM (Placeholder) =====
    const form = document.getElementById('form');
    const formSuccess = document.getElementById('formSuccess');

    if (form) {
        form.addEventListener('submit', function(e) {
            // Note: When you are ready to make the form live, use Formspree or Netlify Forms.
            // If you want to show the success message without a backend, uncomment the lines below:
            
            // e.preventDefault();
            // form.style.display = 'none';
            // if (formSuccess) formSuccess.style.display = 'block';
        });
    }

    // ===== 6. SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 7. DYNAMIC COPYRIGHT YEAR (NEW) =====
    // Automatically updates the footer year so it never gets outdated
    const yearSpans = document.querySelectorAll('.current-year');
    if (yearSpans.length > 0) {
        const currentYear = new Date().getFullYear();
        yearSpans.forEach(span => span.textContent = currentYear);
    }

});
