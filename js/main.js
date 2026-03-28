// ========================================
// Warm Stories - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initFAQAccordion();
  initContactForm();
  initNewsletterForm();
  initFilterButtons();
  initScrollAnimations();
});

// --- Mobile Menu ---
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navLinks');
  
  if (!btn || !nav) return;
  
  btn.addEventListener('click', () => {
    nav.classList.toggle('active');
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// --- FAQ Accordion ---
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked if wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  const inputs = form.querySelectorAll('input, textarea');
  
  // Real-time validation
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    inputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      showSuccess(form);
    }
  });
}

function validateField(field) {
  const group = field.closest('.form-group');
  let isValid = true;
  
  // Clear previous error
  clearError(field);
  
  // Required check
  if (field.hasAttribute('required') && !field.value.trim()) {
    showError(field, 'This field is required');
    isValid = false;
  }
  
  // Email check
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      showError(field, 'Please enter a valid email');
      isValid = false;
    }
  }
  
  return isValid;
}

function showError(field, message) {
  const group = field.closest('.form-group');
  group.classList.add('error');
  
  let errorEl = group.querySelector('.form-error');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'form-error';
    group.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearError(field) {
  const group = field.closest('.form-group');
  group.classList.remove('error');
  
  const errorEl = group.querySelector('.form-error');
  if (errorEl) errorEl.remove();
}

function showSuccess(form) {
  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  
  btn.textContent = 'Sending...';
  btn.disabled = true;
  
  setTimeout(() => {
    form.innerHTML = `
      <div style="text-align: center; padding: 40px;">
        <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
        <h3>Message Sent!</h3>
        <p style="color: var(--secondary); margin-top: 8px;">
          Thanks for reaching out. We'll get back to you within 24 hours.
        </p>
      </div>
    `;
  }, 1000);
}

// --- Newsletter Form ---
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  
  const input = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      input.style.borderColor = '#C75050';
      input.focus();
      return;
    }
    
    btn.textContent = 'Subscribing...';
    btn.disabled = true;
    
    setTimeout(() => {
      input.value = '';
      btn.textContent = 'Subscribed! ✓';
      
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.disabled = false;
      }, 2000);
    }, 1000);
  });
}

// --- Category Filters ---
function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  const posts = document.querySelectorAll('.post-card');
  
  if (!buttons.length || !posts.length) return;
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      
      // Update active button
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter posts
      posts.forEach(post => {
        const postCategory = post.dataset.category;
        
        if (category === 'all' || postCategory === category) {
          post.style.display = '';
          post.style.animation = 'fadeUp 400ms ease forwards';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 500ms ease, transform 500ms ease';
    observer.observe(el);
  });
}
