// Load certifications data and render education cards
async function loadCertifications() {
    try {
        const response = await fetch('data/certifications.json');
        const data = await response.json();
        const educationGrid = document.getElementById('educationGrid');
        
        data.certifications.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'education-card fade-in';
            certCard.setAttribute('data-cert-id', cert.id);
            
            certCard.innerHTML = `
                <div class="education-icon">
                    <i class="${cert.icon}"></i>
                </div>
                <div class="education-date">${cert.date}</div>
                <h3>${cert.name}</h3>
                <h4>${cert.institution}</h4>
                <p>${cert.description}</p>
                <div class="cert-badge" data-cert-id="${cert.id}">${cert.badge}</div>
            `;
            
            educationGrid.appendChild(certCard);
        });
        
        // Re-initialize scroll animations for newly added cards
        setTimeout(() => {
            const newEducationCards = document.querySelectorAll('.education-card');
            newEducationCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 100;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                }
            });
            
            // Re-attach event listeners to new certification badges
            attachCertificationListeners();
        }, 100);
        
    } catch (error) {
        console.error('Error loading certifications:', error);
        document.getElementById('educationGrid').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #8892b0;">
                <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <p>Unable to load certifications. Please check your connection and try again.</p>
            </div>
        `;
    }
}

// Certification Modal Functionality
const certModal = document.getElementById('certModal');
const closeCertModal = document.getElementById('closeCertModal');

// Certification data loaded from JSON
let certificationsData = {};

// Open certification modal
function openCertificationModal(certId) {
    const cert = certificationsData[certId];
    
    if (cert) {
        document.getElementById('certName').textContent = cert.name;
        document.getElementById('certOrg').textContent = cert.institution;
        document.getElementById('certDate').textContent = cert.date;
        document.getElementById('certId').textContent = cert.credentialId;
        document.getElementById('certUrl').href = cert.url;
        document.getElementById('certSkills').textContent = cert.skills;
        document.getElementById('certDescription').textContent = cert.description;
        document.getElementById('certModalTitle').textContent = cert.name;
        
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close certification modal
function closeCertificationModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Attach event listeners to certification badges
function attachCertificationListeners() {
    const certBadges = document.querySelectorAll('.cert-badge');
    
    certBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert-id');
            openCertificationModal(certId);
        });
    });
}

// Load certifications data and set up modal
async function initializeCertifications() {
    try {
        // Load certifications data
        const response = await fetch('data/certifications.json');
        const data = await response.json();
        
        // Convert array to object with id as key
        data.certifications.forEach(cert => {
            certificationsData[cert.id] = cert;
        });
        
        // Render certifications
        await loadCertifications();
        
        // Set up modal close events
        closeCertModal.addEventListener('click', closeCertificationModal);
        
        certModal.addEventListener('click', function(e) {
            if (e.target === certModal) {
                closeCertificationModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && certModal.classList.contains('active')) {
                closeCertificationModal();
            }
        });
        
    } catch (error) {
        console.error('Error initializing certifications:', error);
    }
}

// Initialize certifications when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCertifications);
