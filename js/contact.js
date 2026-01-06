// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // In a real implementation, you would send this data to a server
    // For now, just show a success message
    alert(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Log the contact form submission (for debugging)
    console.log('Contact form submitted:', {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toISOString()
    });
});

// Social media links configuration
const socialLinks = [
    {
        platform: 'GitHub',
        icon: 'fab fa-github',
        url: 'https://github.com/weldonlangat',
        color: '#333'
    },
    {
        platform: 'LinkedIn',
        icon: 'fab fa-linkedin',
        url: 'https://linkedin.com/in/weldonlangat',
        color: '#0077B5'
    },
    {
        platform: 'Twitter',
        icon: 'fab fa-twitter',
        url: 'https://twitter.com/weldonlangat',
        color: '#1DA1F2'
    },
    {
        platform: 'Kaggle',
        icon: 'fab fa-kaggle',
        url: 'https://kaggle.com/weldonlangat',
        color: '#20BEFF'
    }
];

// Update social links with actual URLs (optional)
function updateSocialLinks() {
    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        
        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.title = link.platform;
            a.target = '_blank';
            a.innerHTML = `<i class="${link.icon}"></i>`;
            
            // Add hover effect color
            a.style.setProperty('--hover-color', link.color);
            
            socialContainer.appendChild(a);
        });
    }
}

// Initialize contact functionality
function initializeContact() {
    updateSocialLinks();
    
    // Add CSS for social link hover colors
    const style = document.createElement('style');
    style.textContent = `
        .social-links a:hover {
            background: var(--hover-color, #64ffda) !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeContact);
