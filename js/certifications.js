// Fallback certifications data
const fallbackCertifications = {
    "certifications": [
        {
            "id": 1,
            "type": "degree",
            "icon": "fas fa-graduation-cap",
            "date": "2021 - 2024",
            "name": "MSc Data Science",
            "institution": "University of Nairobi",
            "description": "Specialized in Machine Learning, Statistical Analysis, and Big Data Technologies. Graduated with Distinction.",
            "badge": "GPA: 3.9/4.0",
            "credentialId": "UNAI-2024-MSC-DS",
            "url": "#",
            "skills": "Machine Learning, Statistical Analysis, Big Data, Python, R, SQL"
        },
        {
            "id": 2,
            "type": "degree",
            "icon": "fas fa-graduation-cap",
            "date": "2017 - 2021",
            "name": "BSc Computer Science",
            "institution": "Kenyatta University",
            "description": "Major in Artificial Intelligence and Data Mining. Received Dean's Honors for Academic Excellence.",
            "badge": "First Class Honors",
            "credentialId": "KU-CS-2021-BSC",
            "url": "#",
            "skills": "Artificial Intelligence, Data Mining, Algorithms, Software Engineering"
        },
        {
            "id": 3,
            "type": "certification",
            "icon": "fas fa-certificate",
            "date": "2023",
            "name": "Google Data Analytics Certificate",
            "institution": "Google Career Certificates",
            "description": "Professional certification covering the entire data analysis process including data cleaning, analysis, visualization, and R programming.",
            "badge": "Credential ID: G-DAC-7890123",
            "credentialId": "G-DAC-7890123",
            "url": "#",
            "skills": "Data Cleaning, Analysis, Visualization, R Programming, SQL, Tableau"
        },
        {
            "id": 4,
            "type": "certification",
            "icon": "fas fa-certificate",
            "date": "2022",
            "name": "Azure Data Scientist Associate",
            "institution": "Microsoft",
            "description": "Certification demonstrating expertise in implementing machine learning models on Azure and managing data science workflows.",
            "badge": "Credential ID: DP-100",
            "credentialId": "DP-100",
            "url": "#",
            "skills": "Azure Machine Learning, ML Operations, Model Deployment, Cloud AI"
        }
    ]
};

// Load certifications data and render education cards
async function loadCertifications() {
    try {
        const educationGrid = document.getElementById('educationGrid');
        
        if (!educationGrid) {
            console.error('Education grid element not found!');
            return;
        }
        
        let data;
        
        // Try to load from JSON file first
        try {
            const response = await fetch('data/certifications.json');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            data = await response.json();
            console.log('Loaded certifications from JSON file');
        } catch (fetchError) {
            console.warn('Could not load from JSON file, using fallback data:', fetchError);
            data = fallbackCertifications;
        }
        
        // Clear any existing content
        educationGrid.innerHTML = '';
        
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
        
        // Initialize certifications data object for modal
        data.certifications.forEach(cert => {
            certificationsData[cert.id] = cert;
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
        const educationGrid = document.getElementById('educationGrid');
        if (educationGrid) {
            educationGrid.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #8892b0; grid-column: 1/-1;">
                    <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 20px;"></i>
                    <h3>Error Loading Certifications</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
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
function initializeCertifications() {
    try {
        // Render certifications
        loadCertifications();
        
        // Set up modal close events
        if (closeCertModal) {
            closeCertModal.addEventListener('click', closeCertificationModal);
        }
        
        if (certModal) {
            certModal.addEventListener('click', function(e) {
                if (e.target === certModal) {
                    closeCertificationModal();
                }
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
                closeCertificationModal();
            }
        });
        
    } catch (error) {
        console.error('Error initializing certifications:', error);
    }
}

// Initialize certifications when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCertifications);
} else {
    initializeCertifications();
}
