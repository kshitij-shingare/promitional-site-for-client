// Hide loader when full page loads
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => { loader.style.display = 'none'; }, 500);
});

// Mobile nav toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Smooth scroll & active nav link highlighting
const navLinksArr = Array.from(document.querySelectorAll('.nav-link'));
const sections = navLinksArr.map(link => {
  const id = link.getAttribute('href').slice(1);
  return document.getElementById(id);
}).filter(Boolean);

function onScroll() {
  const scrollPos = window.scrollY + window.innerHeight / 3;
  sections.forEach((sec, idx) => {
    if (sec.offsetTop <= scrollPos && (sec.offsetTop + sec.offsetHeight) > scrollPos) {
      navLinksArr.forEach(l => l.classList.remove('active'));
      if (navLinksArr[idx]) navLinksArr[idx].classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll);

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (!testimonials || testimonials.length === 0) return;
    testimonials.forEach(t => t.classList.remove('active'));
    const safeIndex = ((index % testimonials.length) + testimonials.length) % testimonials.length;
    testimonials[safeIndex].classList.add('active');
}

if (testimonials.length > 0) {
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    showTestimonial(currentTestimonial);
}

// Quote form submission
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = quoteForm.name?.value.trim() || '';
        const email = quoteForm.email?.value.trim() || '';
        const details = quoteForm.details?.value.trim() || '';
        if (!name || !email || !details) {
            alert('Please fill in required fields (Name, Email, Details).');
            return;
        }
        // optional: validate email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        alert(`Thank you ${name}! Your quote request has been submitted.`);
        quoteForm.reset();
    });
}

// Contact form (safe guard and validation)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name?.value.trim() || '';
        const email = contactForm.email?.value.trim() || '';
        const message = contactForm.message?.value.trim() || '';
        if (!name || !email || !message) {
            alert('Please fill all required contact fields.');
            return;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            alert('Enter a valid email.');
            return;
        }
        alert(`Thank you ${name}! We’ll get in touch soon.`);
        contactForm.reset();
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;
        if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
        } else {
                navbar.classList.remove('scrolled');
        }
});

// Smooth Scroll to Section
function scrollToSection(event, sectionId) {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = section.offsetTop - navbarHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// FAQ Toggle
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Quote Modal
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.getElementById('quoteModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quoteModal') {
        closeQuoteModal();
    }
});

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        message: e.target.message.value
    };
    
    console.log('Contact Form Data:', formData);
    
    // Show success message
    showToast('Thank you for your message! We\'ll get back to you soon.');
    
    // Reset form
    e.target.reset();
});

// Quote Form Submission
document.getElementById('quoteForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
        product: e.target.product.value,
        quantity: e.target.quantity.value,
        details: e.target.details.value
    };
    
    console.log('Quote Form Data:', formData);
    
    // Show success message
    showToast('Quote request submitted successfully! We\'ll contact you within 24 hours.');
    
    // Reset form and close modal
    e.target.reset();
    closeQuoteModal();
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-scale-in');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        const quoteModal = document.getElementById('quoteModal');
        
        if (mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        if (quoteModal.classList.contains('active')) {
            closeQuoteModal();
        }
    }
});