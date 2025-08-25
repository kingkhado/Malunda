// Enhanced Interactive JavaScript for Malunda Website

// DOM Elements
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Malunda Typing Animation
function initMalundaTyping() {
    const typingElement = document.getElementById('malunda-typing');
    if (!typingElement) return;
    
    const letters = 'MALUNDA'.split('');
    typingElement.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = letter;
        typingElement.appendChild(span);
    });
}

// Create scroll progress bar
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animate class to trigger CSS animations
            entry.target.classList.add('animate');
            
            // Animate section titles and subtitles
            const title = entry.target.querySelector('.section-title');
            const subtitle = entry.target.querySelector('.section-subtitle');
            
            if (title) {
                setTimeout(() => title.classList.add('animate'), 100);
            }
            if (subtitle) {
                setTimeout(() => subtitle.classList.add('animate'), 300);
            }
            
            // Animate cards with stagger effect
            const cards = entry.target.querySelectorAll('.about-card, .service-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 200);
            });
            
            // Animate contact items
            const contactItems = entry.target.querySelectorAll('.contact-item');
            contactItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
            });
            
            // Animate leadership info
            const leadershipInfo = entry.target.querySelector('.leadership-info');
            if (leadershipInfo) {
                setTimeout(() => {
                    leadershipInfo.classList.add('animate');
                }, 600);
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    observer.observe(section);
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card interactive effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Show service features with animation
        const features = this.querySelectorAll('.service-features li');
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.opacity = '1';
                feature.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Hide service features
        const features = this.querySelectorAll('.service-features li');
        features.forEach(feature => {
            feature.style.opacity = '0';
            feature.style.transform = 'translateX(-20px)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic text animation for hero title
function animateHeroTitle() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const words = heroTitle.innerHTML.split(' ');
        heroTitle.innerHTML = words.map((word, index) => {
            if (word.includes('span')) {
                return word; // Keep the highlight span intact
            }
            return `<span style="display: inline-block; animation-delay: ${index * 0.1}s">${word}</span>`;
        }).join(' ');
    }
}

// Optimized smooth scrolling with faster response
function smoothScrollTo(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        const targetPosition = targetElement.offsetTop - 80; // Account for navbar
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Enhanced navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScrollTo(target);
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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

// Typing effect for dynamic text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Mouse cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #4facfe, #00f2fe);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 20);
        });
    });
}

// Floating particles animation
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(79, 172, 254, 0.3);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for floating animation
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.3; 
        }
        25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
            opacity: 0.6; 
        }
        50% { 
            transform: translateY(-40px) translateX(-10px) rotate(180deg); 
            opacity: 1; 
        }
        75% { 
            transform: translateY(-20px) translateX(-20px) rotate(270deg); 
            opacity: 0.6; 
        }
    }
    
    .nav-link.active {
        color: #4facfe !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(floatingStyle);

// Scroll to Top Button Functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const service = formData.get('service');
            const message = formData.get('message');
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const subject = `Contact Form Submission - ${service || 'General Inquiry'}`;
                const body = `Name: ${name}\nEmail: ${email}\nService Interest: ${service || 'Not specified'}\n\nMessage:\n${message}`;
                const mailtoLink = `mailto:info@malundagroup.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                window.location.href = mailtoLink;
                contactForm.reset();
                showNotification('Thank you for your message! Your email client will open to send the message.', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    if (!document.querySelector('#notification-styles')) {
        const notificationStyles = document.createElement('style');
        notificationStyles.id = 'notification-styles';
        notificationStyles.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 5px;
                margin-left: auto;
            }
            .notification-close:hover {
                opacity: 0.7;
            }
        `;
        document.head.appendChild(notificationStyles);
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// WhatsApp Chat Animation
function initChatAnimations() {
    const chatBubbles = document.querySelectorAll('.chat-bubble');
    
    const chatObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 300);
            }
        });
    }, { threshold: 0.3 });
    
    chatBubbles.forEach(bubble => {
        chatObserver.observe(bubble);
    });
}

// Purpose Cards Animation
function initPurposeAnimations() {
    const purposeCards = document.querySelectorAll('.purpose-card');
    
    const purposeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    purposeCards.forEach(card => {
        purposeObserver.observe(card);
    });
}

// Vision Section Animation
function initVisionAnimations() {
    const visionBefore = document.querySelector('.vision-before');
    const visionAfter = document.querySelector('.vision-after');
    
    const visionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('vision-before')) {
                    setTimeout(() => entry.target.classList.add('animate'), 100);
                } else if (entry.target.classList.contains('vision-after')) {
                    setTimeout(() => entry.target.classList.add('animate'), 300);
                }
            }
        });
    }, { threshold: 0.3 });
    
    if (visionBefore) visionObserver.observe(visionBefore);
    if (visionAfter) visionObserver.observe(visionAfter);
}

// Closing Section Animation
function initClosingAnimations() {
    const closingTitle = document.querySelector('.closing-title');
    const closingSubtitle = document.querySelector('.closing-subtitle');
    const closingPrayer = document.querySelector('.closing-prayer');
    
    const closingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('closing-title')) {
                    entry.target.classList.add('animate');
                } else if (entry.target.classList.contains('closing-subtitle')) {
                    setTimeout(() => entry.target.classList.add('animate'), 200);
                } else if (entry.target.classList.contains('closing-prayer')) {
                    setTimeout(() => entry.target.classList.add('animate'), 400);
                }
            }
        });
    }, { threshold: 0.5 });
    
    if (closingTitle) closingObserver.observe(closingTitle);
    if (closingSubtitle) closingObserver.observe(closingSubtitle);
    if (closingPrayer) closingObserver.observe(closingPrayer);
}

// Prayer Form Functionality
function initPrayerForm() {
    const prayerForm = document.querySelector('.prayer-form');
    
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const textarea = this.querySelector('textarea');
            const prayer = textarea.value.trim();
            
            if (!prayer) {
                showNotification('Please enter your prayer or message.', 'error');
                return;
            }
            
            const subject = 'Prayer Request from Malunda Website';
            const body = `Prayer/Message:\n\n${prayer}`;
            const mailtoLink = `mailto:info@malundagroup.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            window.location.href = mailtoLink;
            textarea.value = '';
            showNotification('Thank you for your prayer! Your email client will open to send it.', 'success');
        });
    }
}

let autoSlideInterval;

// Enhanced Moodboard Carousel with Auto-slide and Click Info
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const slideWidth = 320; // 300px + 20px gap
    let currentIndex = 0;
    
    // Project information for each image - updated to match user requirements
    const projectInfo = [
        {
            title: "Colorful Play Spaces",
            description: "Vibrant, interactive environments that bring out the child in everyone",
            type: "Residential"
        },
        {
            title: "Galaxy Ceilings",
            description: "Starlit spaces that inspire wonder and dreams of infinite possibilities",
            type: "Commercial"
        },
        {
            title: "Nature Integration",
            description: "Bringing the outdoors in with living walls and organic shapes",
            type: "Renovation"
        },
        {
            title: "African Art Murals",
            description: "Celebrating our heritage through bold, contemporary African-inspired art",
            type: "Creative Space"
        },
        {
            title: "Playful Geometry",
            description: "Bold shapes and unexpected angles that challenge conventional design",
            type: "Home Remodelling"
        },
        {
            title: "Interactive Elements",
            description: "Spaces that respond to touch, movement, and imagination",
            type: "Creative Space"
        }
    ];
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    // Add click event listeners to images
    slides.forEach((slide, index) => {
        const img = slide.querySelector('.vision-img');
        if (img) {
            img.addEventListener('click', () => {
                showProjectInfo(index);
                stopAutoSlide(); // Pause the auto-slide when a card is clicked
            });
            img.style.cursor = 'pointer';
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.filter = 'brightness(1.1)';
            });
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.filter = 'brightness(1)';
            });
        }
    });
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    function showProjectInfo(index) {
        const project = projectInfo[index];
        const currentImg = slides[index].querySelector('.vision-img');
        
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-image">
                    <img src="${currentImg.src}" alt="${project.title}">
                </div>
                <div class="modal-info">
                    <h3>${project.title}</h3>
                    <p class="project-type">${project.type}</p>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        function closeModal() {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
        
        setTimeout(() => modal.style.opacity = '1', 10);
    }
    
    startAutoSlide();
    
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
    
    updateCarousel();
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMalundaTyping();
    createScrollProgress();
    animateHeroTitle();
    createCursorTrail();
    createFloatingParticles();
    initScrollToTop();
    initContactForm();
    initChatAnimations();
    initPurposeAnimations();
    initVisionAnimations();
    initClosingAnimations();
    initPrayerForm();
    initCarousel();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🚀 Malunda website loaded with enhanced interactivity and healing animations!');
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

const throttledScroll = throttle(() => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16);

window.addEventListener('scroll', throttledScroll);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -100);
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        console.log('🌈 Easter egg activated! Malunda Group rocks!');
    }
});
