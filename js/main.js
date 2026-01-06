// Running text animation
const runningText = document.querySelector('.running-text');

// Duplicate text for seamless animation
const originalText = runningText.innerHTML;
runningText.innerHTML = originalText + originalText;

// Navigation appear on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('visible');
    } else {
        navbar.classList.remove('visible');
    }
});

// Enhanced scroll animations for elements
const fadeElements = document.querySelectorAll('.fade-in');
const educationCards = document.querySelectorAll('.education-card');
const projectCards = document.querySelectorAll('.project-card');

const checkVisibility = function() {
    // For fade-in elements
    for (let i = 0; i < fadeElements.length; i++) {
        const element = fadeElements[i];
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    }
    
    // For education cards with staggered animation
    educationCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 100;
        
        if (cardTop < window.innerHeight - cardVisible) {
            // Add delay based on index for staggered effect
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200);
        }
    });
    
    // For project cards with staggered animation
    projectCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 100;
        
        if (cardTop < window.innerHeight - cardVisible) {
            // Add delay based on index for staggered effect
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        }
    });
};

window.addEventListener('scroll', checkVisibility);
// Initial check in case elements are already in view
checkVisibility();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add some interactive effects to stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
