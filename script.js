/* ========================================
   UPSI HOLDINGS SDN BHD - JAVASCRIPT
   Comprehensive Interactive Features
   ======================================== */

// ========================================
// MOBILE MENU TOGGLE
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Create mobile menu button if it doesn't exist
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu && window.innerWidth <= 768) {
        // Create hamburger button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        mobileMenuBtn.setAttribute('aria-label', 'Toggle Menu');
        
        // Insert button before nav menu
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileMenuBtn);
        
        // Toggle menu on click
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
});

// ========================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or just #
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// STICKY NAVIGATION ON SCROLL
// ========================================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all service cards, program cards, and benefit items
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .program-card, .benefit-item, .hospitality-card, .process-step, .offer-card'
    );
    
    elementsToAnimate.forEach(el => {
        fadeInObserver.observe(el);
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS
// ========================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    animateCounter(statNumber, number);
                    entry.target.classList.add('counted');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statBoxes = document.querySelectorAll('.stat-box, .stat-item');
    statBoxes.forEach(box => statsObserver.observe(box));
});

// ========================================
// FORM VALIDATION (if forms exist)
// ========================================
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get all required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                // Remove error class on input
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (isValid) {
            // Show success message
            showNotification('Form submitted successfully!', 'success');
            form.reset();
        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
});

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// MODAL/POPUP FUNCTIONALITY
// ========================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// ========================================
// IMAGE LAZY LOADING
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTop);
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT
// ========================================
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

highlightActiveNav();

// ========================================
// PHONE NUMBER CLICK TO CALL (Mobile)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Find all phone numbers and make them clickable
    const phoneElements = document.querySelectorAll('.contact-info span:first-child, .footer-contact-item');
    
    phoneElements.forEach(element => {
        const text = element.textContent;
        const phoneMatch = text.match(/\d{3}-\d{4}\s\d{3}|\d{2}-\d{3}\s\d{4}/);
        
        if (phoneMatch) {
            const phoneNumber = phoneMatch[0].replace(/\s/g, '').replace(/-/g, '');
            element.style.cursor = 'pointer';
            
            element.addEventListener('click', function() {
                window.location.href = `tel:+6${phoneNumber}`;
            });
        }
    });
});

// ========================================
// PRICING CARD HIGHLIGHT
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => c.classList.remove('highlighted'));
            this.classList.add('highlighted');
        });
    });
});

// ========================================
// COPY TO CLIPBOARD FUNCTIONALITY
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification('Copied to clipboard!', 'success');
    }).catch(function() {
        showNotification('Failed to copy', 'error');
    });
}

// ========================================
// INITIALIZE ALL TOOLTIPS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
});

// ========================================
// GALLERY LIGHTBOX (if gallery exists)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length > 0) {
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
            <img src="" alt="">
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('img');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        let currentIndex = 0;
        
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                const img = this.querySelector('img');
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});

// ========================================
// SEARCH FUNCTIONALITY (if search exists)
// ========================================
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchableItems = document.querySelectorAll('[data-searchable]');
        
        searchableItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// ========================================
// PRINT PAGE FUNCTIONALITY
// ========================================
function printPage() {
    window.print();
}

// ========================================
// SOCIAL SHARE FUNCTIONALITY
// ========================================
function shareOnSocial(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        whatsapp: `https://wa.me/?text=${title}%20${url}`
    };
    
    if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance) {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.message);
});

// ========================================
// CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c UPSI Holdings Sdn Bhd ', 'background: #800020; color: #D4AF37; font-size: 20px; padding: 10px;');
console.log('%c Synergy of Resources & UPSI Expertise ', 'color: #1E4D8B; font-size: 14px;');
console.log('%c Website developed with ❤️ ', 'color: #10B981; font-size: 12px;');

// ========================================
// END OF SCRIPT
// =======================================