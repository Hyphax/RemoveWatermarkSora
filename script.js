// Advanced JavaScript for RemoveWatermarkSora.net
// Premium interactions, animations, and functionality

// Clean, minimal JavaScript - no FAQ needed

class RemoveWatermarkSora {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.setupAnimations();
        this.setupPerformanceOptimizations();
    }

    initializeApp() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        this.setupScrollAnimations();
        this.setupMagneticButtons();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
        this.loadAdditionalContent();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Smooth scroll for navigation links
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                }
            }
        });

        // Header scroll effect
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const header = document.querySelector('.header');
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide header on scroll down, show on scroll up
            if (scrollY > lastScrollY && scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });

        // Resize handler for responsive features
        window.addEventListener('resize', this.debounce(() => {
            this.setupResponsiveFeatures();
        }, 300));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations for different elements
                    if (entry.target.classList.contains('counter')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('feature-card')) {
                        setTimeout(() => {
                            entry.target.style.animationPlayState = 'running';
                        }, Math.random() * 300);
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            animateOnScroll.observe(el);
        });

        // Staggered animations for groups
        document.querySelectorAll('.features-grid .feature-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    setupMagneticButtons() {
        const magneticElements = document.querySelectorAll('.cta-primary, .cta-button-large, .cta-header');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 100;
                
                if (distance < maxDistance) {
                    const strength = (maxDistance - distance) / maxDistance;
                    const moveX = x * strength * 0.3;
                    const moveY = y * strength * 0.3;
                    
                    element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                }
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero::before, .features');
        
        const updateParallax = () => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        let parallaxTicking = false;
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const finalValue = counter.textContent;
            const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
            
            if (numericValue) {
                counter.dataset.finalValue = finalValue;
                counter.textContent = '0';
            }
        });
    }

    animateCounter(counterElement) {
        const finalValue = counterElement.dataset.finalValue;
        const numericValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        const suffix = finalValue.replace(/[\d,]/g, '');
        
        if (!numericValue) return;
        
        const duration = 2000;
        const startTime = Date.now();
        
        const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentValue = Math.floor(numericValue * this.easeOutExpo(progress));
            
            counterElement.textContent = currentValue.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.textContent = finalValue;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    loadAdditionalContent() {
        // Load testimonials
        setTimeout(() => {
            this.loadTestimonials();
        }, 2000);

        // Load about section
        setTimeout(() => {
            this.loadAboutSection();
        }, 3000);
    }



    loadTestimonials() {
        const testimonialsHTML = `
            <section class="testimonials animate-on-scroll">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Trusted by Creators</h2>
                        <p class="section-subtitle">See what content creators are saying about RemoveWatermarkSora</p>
                    </div>
                    
                    <div class="testimonials-grid">
                        ${this.generateTestimonials()}
                    </div>
                </div>
            </section>
        `;
        
        const ctaSection = document.querySelector('.cta');
        ctaSection.insertAdjacentHTML('beforebegin', testimonialsHTML);
        this.observeNewElements();
    }

    generateTestimonials() {
        const testimonials = [
            {
                name: "Sarah Chen",
                role: "Content Creator",
                avatar: "SC",
                rating: 5,
                text: "Game-changer! I was spending hours manually editing watermarks. This tool does it perfectly in seconds. The quality is identical to the original."
            },
            {
                name: "Marcus Rodriguez",
                role: "Video Producer",
                avatar: "MR",
                rating: 5,
                text: "Incredible AI technology. I've processed over 200 Sora videos and the results are consistently flawless. Saved me countless hours."
            },
            {
                name: "Emma Thompson",
                role: "Digital Artist",
                avatar: "ET",
                rating: 5,
                text: "I was skeptical at first, but the quality is amazing. No artifacts, no quality loss. It's like the watermark was never there."
            },
            {
                name: "David Kim",
                role: "YouTuber",
                avatar: "DK",
                rating: 5,
                text: "Perfect for my workflow. Upload, wait 30 seconds, download. Clean, professional results every time. Highly recommend!"
            },
            {
                name: "Lisa Johnson",
                role: "Marketing Director",
                avatar: "LJ",
                rating: 5,
                text: "Our team processes dozens of Sora videos weekly. This tool has become essential to our content pipeline. Fast, reliable, free."
            },
            {
                name: "Alex Parker",
                role: "Indie Filmmaker",
                avatar: "AP",
                rating: 5,
                text: "The batch processing feature is a lifesaver. I can queue up multiple videos and they're all processed perfectly. Professional quality."
            }
        ];

        return testimonials.map((testimonial, index) => `
            <div class="testimonial-card animate-on-scroll" style="animation-delay: ${index * 0.15}s;">
                <div class="testimonial-header">
                    <div class="avatar">${testimonial.avatar}</div>
                    <div class="testimonial-info">
                        <h4 class="testimonial-name">${testimonial.name}</h4>
                        <p class="testimonial-role">${testimonial.role}</p>
                    </div>
                    <div class="rating">
                        ${'★'.repeat(testimonial.rating)}
                    </div>
                </div>
                <p class="testimonial-text">"${testimonial.text}"</p>
            </div>
        `).join('');
    }

    loadAboutSection() {
        const aboutHTML = `
            <section class="about-sora animate-on-scroll">
                <div class="container">
                    <div class="about-content">
                        <div class="about-text">
                            <h2 class="about-title">About Sora 2 & Watermark Removal</h2>
                            <p class="about-description">
                                OpenAI's Sora 2 represents a breakthrough in AI-generated video content, producing incredibly realistic videos from text prompts. 
                                However, all Sora-generated content includes a watermark to identify AI-created material.
                            </p>
                            <p class="about-description">
                                While watermarks serve an important purpose for content identification, legitimate creators often need clean versions 
                                for professional presentations, commercial use, or creative projects. Our tool bridges this gap by providing 
                                ethical, high-quality watermark removal for users who own or have rights to their Sora-generated content.
                            </p>
                            <p class="about-description">
                                We believe in responsible AI use and encourage users to maintain transparency about AI-generated content 
                                while providing the flexibility needed for professional creative workflows.
                            </p>
                        </div>
                        <div class="about-visual">
                            <div class="sora-logo-display">
                                <div class="sora-icon">🎬</div>
                                <h3>Sora 2 Compatible</h3>
                                <p>Specialized for OpenAI's latest video generation model</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        const testimonialsSection = document.querySelector('.testimonials');
        testimonialsSection.insertAdjacentHTML('afterend', aboutHTML);
        this.observeNewElements();
    }

    setupAccessibility() {
        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Improve keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add ARIA labels to interactive elements
        document.querySelectorAll('.cta-primary, .cta-button-large').forEach(button => {
            if (!button.getAttribute('aria-label')) {
                button.setAttribute('aria-label', 'Remove watermark from your Sora video');
            }
        });
    }

    setupResponsiveFeatures() {
        const isMobile = window.innerWidth <= 768;
        
        // Disable complex animations on mobile for better performance
        if (isMobile) {
            document.body.classList.add('mobile-device');
            this.disableHeavyAnimations();
        } else {
            document.body.classList.remove('mobile-device');
        }
    }

    disableHeavyAnimations() {
        // Disable parallax on mobile
        document.querySelectorAll('.hero::before').forEach(el => {
            el.style.transform = 'none';
        });
    }

    observeNewElements() {
        // Re-observe newly added elements for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.animate-on-scroll:not(.animate-in)').forEach(el => {
            observer.observe(el);
        });
    }

    setupPerformanceOptimizations() {
        // Intersection Observer for lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        lazyImageObserver.unobserve(img);
                    }
                }
            });
        });

        // Observe lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
            lazyImageObserver.observe(img);
        });

        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        // Preload hero background images
        const criticalImages = [
            '/hero-bg.webp',
            '/comparison-before.webp',
            '/comparison-after.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Utility functions
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - 80; // Account for fixed header
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutQuart(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t * t + b;
        t -= 2;
        return -c / 2 * (t * t * t * t - 2) + b;
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    closeAllModals() {
        document.querySelectorAll('.modal.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }
}

// Initialize the application
const app = new RemoveWatermarkSora();

// Additional CSS for dynamically loaded content
const additionalStyles = `
<style>


/* Testimonials Styles */
.testimonials {
    padding: 120px 0;
    background: 
        radial-gradient(circle at 30% 70%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 32px;
    max-width: 1200px;
    margin: 0 auto;
}

.testimonial-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 32px;
    transition: all 0.4s ease;
}

.testimonial-card:hover {
    transform: translateY(-8px);
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
}

.testimonial-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 16px;
}

.testimonial-info {
    flex: 1;
}

.testimonial-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 4px;
}

.testimonial-role {
    font-size: 14px;
    color: var(--text-secondary);
}

.rating {
    color: #fbbf24;
    font-size: 16px;
}

.testimonial-text {
    color: var(--text-secondary);
    line-height: 1.6;
    font-style: italic;
}

/* About Sora Styles */
.about-sora {
    padding: 120px 0;
    background: rgba(0, 0, 0, 0.2);
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 80px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.about-title {
    font-size: clamp(32px, 5vw, 48px);
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--text);
}

.about-description {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 24px;
    font-size: 16px;
}

.about-visual {
    text-align: center;
}

.sora-logo-display {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 48px 32px;
    transition: all 0.4s ease;
}

.sora-logo-display:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
}

.sora-icon {
    font-size: 64px;
    margin-bottom: 20px;
}

.sora-logo-display h3 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 12px;
}

.sora-logo-display p {
    color: var(--text-secondary);
    font-size: 14px;
}

/* Skip Link */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--primary);
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 10000;
    transition: top 0.3s ease;
}

.skip-link:focus {
    top: 6px;
}

/* Keyboard Navigation */
.keyboard-navigation *:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

/* Mobile Optimizations */
@media (max-width: 768px) {

    
    .testimonials-grid {
        grid-template-columns: 1fr;
        gap: 24px;
    }
    
    .testimonial-card {
        padding: 24px;
    }
    
    .about-content {
        grid-template-columns: 1fr;
        gap: 48px;
    }
    
    .sora-logo-display {
        padding: 32px 24px;
    }
}

@media (max-width: 480px) {
    .testimonials-grid {
        grid-template-columns: 1fr;
    }
    
    .testimonial-header {
        gap: 12px;
    }
    
    .avatar {
        width: 40px;
        height: 40px;
        font-size: 14px;
    }
}
</style>
`;

// Inject additional styles
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Performance monitoring
window.addEventListener('load', () => {
    // Track Core Web Vitals
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
        
        // Track Largest Contentful Paint
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }
});

// Service Worker for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}