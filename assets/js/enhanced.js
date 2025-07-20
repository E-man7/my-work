/**
 * Enhanced Portfolio JavaScript - Modern Interactions & Features
 */

(function() {
  "use strict";

  // Enhanced Portfolio Class
  class EnhancedPortfolio {
    constructor() {
      this.init();
    }

    init() {
      this.initParallaxEffects();
      this.initSmoothScrolling();
      this.initEnhancedAnimations();
      this.initInteractiveElements();
      this.initPerformanceOptimizations();
      this.initAccessibilityFeatures();
      this.initHeroStatistics();
    }

    // Parallax Effects
    initParallaxEffects() {
      const parallaxElements = document.querySelectorAll('.hero, .stats');
      
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const speed = element.dataset.speed || 0.5;
          const yPos = -(scrolled * speed);
          element.style.transform = `translateY(${yPos}px)`;
        });
      });
    }

    // Enhanced Smooth Scrolling
    initSmoothScrolling() {
      const links = document.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          
          if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    // Enhanced Animations
    initEnhancedAnimations() {
      // Intersection Observer for enhanced animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Add staggered animations for children
            const children = entry.target.querySelectorAll('.animate-stagger');
            children.forEach((child, index) => {
              child.style.animationDelay = `${index * 0.1}s`;
              child.classList.add('animate-in');
            });
          }
        });
      }, observerOptions);

      // Observe elements with animation classes
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }

    // Interactive Elements
    initInteractiveElements() {
      // Enhanced Portfolio Filter
      this.initEnhancedPortfolioFilter();
      
      // Enhanced Contact Form
      this.initEnhancedContactForm();
      
      // Enhanced Skills Animation
      this.initEnhancedSkillsAnimation();
      
      // Cursor Effects
      this.initCursorEffects();
    }

    // Enhanced Portfolio Filter with Search
    initEnhancedPortfolioFilter() {
      const filterButtons = document.querySelectorAll('.portfolio-filters li');
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      const searchInput = document.createElement('input');
      
      // Add search functionality
      searchInput.type = 'text';
      searchInput.placeholder = 'Search projects...';
      searchInput.className = 'portfolio-search form-control mb-4';
      searchInput.style.cssText = `
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 25px;
        padding: 12px 20px;
        color: white;
        backdrop-filter: blur(10px);
      `;

      const filterContainer = document.querySelector('.portfolio-filters');
      if (filterContainer) {
        filterContainer.parentNode.insertBefore(searchInput, filterContainer);
      }

      // Search functionality
      searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        portfolioItems.forEach(item => {
          const title = item.querySelector('h4').textContent.toLowerCase();
          const category = item.className.toLowerCase();
          
          if (title.includes(searchTerm) || category.includes(searchTerm)) {
            item.style.display = 'block';
            item.classList.add('search-match');
          } else {
            item.style.display = 'none';
            item.classList.remove('search-match');
          }
        });
      });

      // Enhanced filter with animations
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          const filter = button.getAttribute('data-filter');
          
          // Remove active class from all buttons
          filterButtons.forEach(btn => btn.classList.remove('filter-active'));
          button.classList.add('filter-active');
          
          // Animate portfolio items
          portfolioItems.forEach((item, index) => {
            setTimeout(() => {
              if (filter === '*' || item.classList.contains(filter.replace('.', ''))) {
                item.style.display = 'block';
                item.classList.add('filter-animate');
              } else {
                item.style.display = 'none';
                item.classList.remove('filter-animate');
              }
            }, index * 50);
          });
        });
      });
    }

    // Enhanced Contact Form with Validation
    initEnhancedContactForm() {
      const form = document.querySelector('.php-email-form');
      if (!form) return;

      const inputs = form.querySelectorAll('input, textarea');
      
      inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => {
          this.validateField(input);
        });
        
        // Enhanced focus effects
        input.addEventListener('focus', () => {
          input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.parentElement.classList.remove('focused');
          }
        });
      });

      // Form submission with enhanced feedback
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (this.validateForm(form)) {
          this.showLoadingState(form);
          this.simulateFormSubmission(form);
        }
      });
    }

    validateField(field) {
      const value = field.value.trim();
      const fieldType = field.type;
      let isValid = true;
      let errorMessage = '';

      switch (fieldType) {
        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isValid = emailRegex.test(value);
          errorMessage = 'Please enter a valid email address';
          break;
        case 'text':
          isValid = value.length >= 2;
          errorMessage = 'This field must be at least 2 characters long';
          break;
        case 'textarea':
          isValid = value.length >= 10;
          errorMessage = 'Message must be at least 10 characters long';
          break;
      }

      if (!isValid && value) {
        this.showFieldError(field, errorMessage);
      } else {
        this.clearFieldError(field);
      }

      return isValid;
    }

    validateForm(form) {
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!this.validateField(input)) {
          isValid = false;
        }
      });

      return isValid;
    }

    showFieldError(field, message) {
      this.clearFieldError(field);
      
      const errorDiv = document.createElement('div');
      errorDiv.className = 'field-error';
      errorDiv.textContent = message;
      errorDiv.style.cssText = `
        color: #ff4757;
        font-size: 0.875rem;
        margin-top: 5px;
        animation: slideInDown 0.3s ease;
      `;
      
      field.parentNode.appendChild(errorDiv);
      field.classList.add('error');
    }

    clearFieldError(field) {
      const existingError = field.parentNode.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }
      field.classList.remove('error');
    }

    showLoadingState(form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.innerHTML = '<i class="bi bi-arrow-clockwise spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Store original text for restoration
      submitBtn.dataset.originalText = originalText;
    }

    simulateFormSubmission(form) {
      // Simulate API call
      setTimeout(() => {
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = submitBtn.dataset.originalText;
        submitBtn.disabled = false;
        
        this.showSuccessMessage(form);
      }, 2000);
    }

    showSuccessMessage(form) {
      const successDiv = form.querySelector('.sent-message');
      successDiv.style.display = 'block';
      successDiv.style.animation = 'slideInUp 0.5s ease';
      
      // Reset form
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        successDiv.style.display = 'none';
      }, 5000);
    }

    // Enhanced Skills Animation
    initEnhancedSkillsAnimation() {
      const skillsSection = document.querySelector('.skills-content');
      if (!skillsSection) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            
            progressBars.forEach((bar, index) => {
              setTimeout(() => {
                const targetWidth = bar.getAttribute('aria-valuenow') + '%';
                bar.style.width = '0%';
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                setTimeout(() => {
                  bar.style.width = targetWidth;
                }, 100);
              }, index * 200);
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(skillsSection);
    }

    // Hero Statistics Animation
    initHeroStatistics() {
      const heroStats = document.querySelector('.hero-stats');
      if (!heroStats) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Trigger PureCounter for hero statistics
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
              setTimeout(() => {
                const endValue = stat.getAttribute('data-purecounter-end');
                const duration = stat.getAttribute('data-purecounter-duration') || 2;
                
                // Animate the number
                let startValue = 0;
                const increment = endValue / (duration * 60); // 60fps
                
                const timer = setInterval(() => {
                  startValue += increment;
                  if (startValue >= endValue) {
                    startValue = endValue;
                    clearInterval(timer);
                  }
                  stat.textContent = Math.floor(startValue);
                }, 1000 / 60); // 60fps
              }, index * 500);
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(heroStats);
    }

    // Cursor Effects - Disabled
    initCursorEffects() {
      // Cursor animation removed as requested
    }

    // Performance Optimizations
    initPerformanceOptimizations() {
      // Lazy loading for images
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));

      // Debounced scroll events
      let scrollTimeout;
      window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          // Perform scroll-based operations here
        }, 16); // ~60fps
      });
    }

    // Accessibility Features
    initAccessibilityFeatures() {
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });

      // Focus indicators
      const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
      focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
          element.style.outline = '2px solid var(--accent-color)';
          element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
          element.style.outline = '';
          element.style.outlineOffset = '';
        });
      });
    }
  }

  // Initialize Enhanced Portfolio when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    new EnhancedPortfolio();
  });

  // Additional CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInUp {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-in {
      animation: slideInUp 0.6s ease forwards;
    }

    .animate-stagger {
      opacity: 0;
      transform: translateY(20px);
    }

    .animate-stagger.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .filter-animate {
      animation: fadeInScale 0.5s ease forwards;
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .keyboard-navigation *:focus {
      outline: 2px solid var(--accent-color) !important;
      outline-offset: 2px !important;
    }

    .lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }

    .lazy.loaded {
      opacity: 1;
    }
  `;
  
  document.head.appendChild(style);

})(); 