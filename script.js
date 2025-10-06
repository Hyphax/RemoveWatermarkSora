// Advanced JavaScript for RemoveWatermarkSora.net
// Premium interactions, animations, and functionality

// FAQ Toggle Functionality
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

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
        // Load FAQ section
        setTimeout(() => {
            this.loadFAQSection();
        }, 2000);

        // Load testimonials
        setTimeout(() => {
            this.loadTestimonials();
        }, 3000);

        // Load about section
        setTimeout(() => {
            this.loadAboutSection();
        }, 4000);
    }

    loadFAQSection() {
        const faqHTML = `
            <section class="faq" id="faq">
                <div class="container">
                    <div class="section-header animate-on-scroll">
                        <h2 class="section-title">Frequently Asked Questions</h2>
                        <p class="section-subtitle">Everything you need to know about Sora watermark removal</p>
                    </div>
                    
                    <div class="faq-container">
                        ${this.generateFAQItems()}
                    </div>
                </div>
            </section>
        `;
        
        const ctaSection = document.querySelector('.cta-section');
        ctaSection.insertAdjacentHTML('beforebegin', faqHTML);
        
        this.setupFAQInteractions();
        this.observeNewElements();
    }

    generateFAQItems() {
        const faqs = [
            {
                question: "Is it legal to remove Sora watermarks?",
                answer: "Yes, it's legal to remove watermarks from content you have created or have permission to modify. Our tool is designed for legitimate use cases where you own the content or have proper licensing rights."
            },
            {
                question: "How does the AI watermark removal work?",
                answer: "Our advanced AI uses machine learning algorithms trained specifically on Sora watermark patterns. It analyzes the video frame by frame, identifies the watermark location, and intelligently reconstructs the underlying content while maintaining original quality."
            },
            {
                question: "What video formats are supported?",
                answer: "We support all major video formats including MP4, MOV, AVI, MKV, and WebM. The output format will match your input format to maintain compatibility with your workflow."
            },
            {
                question: "Is there any quality loss during processing?",
                answer: "No, our AI preservation technology ensures zero quality loss. The original video bitrate, resolution, and codec settings are maintained throughout the watermark removal process."
            },
            {
                question: "How long does processing take?",
                answer: "Most videos are processed in 30-60 seconds. Processing time depends on video length and resolution. 1-minute 1080p videos typically take 38 seconds on average."
            },
            {
                question: "Is my video data secure and private?",
                answer: "Absolutely. We process videos locally in your browser when possible, and all uploaded content is automatically deleted from our servers within 24 hours. We never store, share, or analyze your videos."
            },
            {
                question: "Do I need to create an account?",
                answer: "No sign-up required! You can start removing watermarks immediately. No email, no registration, no personal information needed."
            },
            {
                question: "Is the service really free forever?",
                answer: "Yes, our core watermark removal service is 100% free with no hidden costs, no subscription fees, and no limits on usage. We believe in democratizing access to professional video editing tools."
            },
            {
                question: "Can I process multiple videos at once?",
                answer: "Yes, our batch processing feature allows you to upload and process multiple videos simultaneously, saving you time when working with multiple Sora-generated content."
            },
            {
                question: "What if the watermark isn't detected?",
                answer: "Our AI has a 99.7% success rate with Sora watermarks. If detection fails, try ensuring the video is in good quality and the watermark is clearly visible. Contact support for manual assistance if needed."
            },
            {
                question: "Does this work on mobile devices?",
                answer: "Yes, our tool is fully optimized for mobile browsers. You can upload, process, and download videos directly from your smartphone or tablet."
            },
            {
                question: "Can I use the processed videos commercially?",
                answer: "Commercial usage depends on your rights to the original content. If you created the content with Sora or have commercial licensing, then yes. Always ensure you comply with OpenAI's terms of service."
            },
            {
                question: "What's the maximum file size supported?",
                answer: "We support videos up to 2GB in size. For larger files, consider compressing the video first or contact us for enterprise solutions."
            },
            {
                question: "How accurate is the watermark removal?",
                answer: "Our AI achieves 99.7% accuracy in watermark detection and removal. The technology is continuously improved based on the latest Sora watermark patterns."
            },
            {
                question: "Are there any usage limits?",
                answer: "No daily limits for individual users. Fair usage policies apply to prevent system abuse, but typical content creation needs are fully supported without restrictions."
            },
            {
                question: "What happens to my video after processing?",
                answer: "After you download your processed video, it's automatically deleted from our servers within 24 hours for security and privacy. We recommend downloading immediately after processing."
            },
            {
                question: "Does this work with other AI video generators?",
                answer: "Currently, we're specialized for Sora watermarks. However, we're developing support for other AI video platforms like Runway, Pika Labs, and Stable Video Diffusion."
            },
            {
                question: "Can I integrate this into my workflow?",
                answer: "We're developing API access for developers and integrations with popular video editing software. Join our newsletter to be notified when these features launch."
            },
            {
                question: "What if I encounter technical issues?",
                answer: "Our support team responds within 2 hours during business hours. Check our help center first, or contact us directly for technical assistance."
            },
            {
                question: "Is there a desktop application?",
                answer: "Currently web-based only, but we're developing desktop applications for Windows, Mac, and Linux for enhanced performance and offline processing capabilities."
            }
        ];

        return faqs.map((faq, index) => `
            <div class="faq-item animate-on-scroll" style="animation-delay: ${index * 0.1}s;">
                <div class="faq-question">
                    <span>${faq.question}</span>
                    <div class="faq-icon">+</div>
                </div>
                <div class="faq-answer">
                    <p>${faq.answer}</p>
                </div>
            </div>
        `).join('');
    }

    setupFAQInteractions() {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const icon = question.querySelector('.faq-icon');
                
                const isOpen = faqItem.classList.contains('open');
                
                // Close all other FAQs
                document.querySelectorAll('.faq-item.open').forEach(openItem => {
                    if (openItem !== faqItem) {
                        openItem.classList.remove('open');
                        openItem.querySelector('.faq-icon').textContent = '+';
                    }
                });
                
                if (isOpen) {
                    faqItem.classList.remove('open');
                    icon.textContent = '+';
                } else {
                    faqItem.classList.add('open');
                    icon.textContent = '×';
                }
            });
        });
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
        
        const faqSection = document.querySelector('.faq');
        faqSection.insertAdjacentHTML('beforebegin', testimonialsHTML);
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
/* FAQ Styles */
.faq {
    padding: 120px 0;
    background: rgba(255, 255, 255, 0.01);
}

.faq-container {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    margin-bottom: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.faq-item:hover {
    border-color: rgba(99, 102, 241, 0.3);
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.1);
}

.faq-question {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 18px;
    color: var(--text);
}

.faq-icon {
    font-size: 24px;
    font-weight: 300;
    color: var(--primary);
    transition: transform 0.3s ease;
    user-select: none;
}

.faq-item.open .faq-icon {
    transform: rotate(45deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    padding: 0 24px;
    color: var(--text-secondary);
    line-height: 1.6;
}

.faq-item.open .faq-answer {
    max-height: 200px;
    padding: 0 24px 24px;
}

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
    .faq-question {
        padding: 20px;
        font-size: 16px;
    }
    
    .faq-answer {
        padding: 0 20px;
    }
    
    .faq-item.open .faq-answer {
        padding: 0 20px 20px;
    }
    
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