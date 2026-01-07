// Fallback certifications data (use this for testing)
const fallbackCertifications = {
    "certifications": [
        {
            "id": 1,
            "type": "ongoing",
            "icon": "fas fa-graduation-cap",
            "date": "2025 - Present",
            "name": "MSc Financial Engineering",
            "institution": "WorldQuant University",
            "description": "Currently enrolled in Master of Science in Financial Engineering program, focusing on quantitative finance, risk management, and algorithmic trading.",
            "badge": "In Progress",
            "credentialId": "WQU-Student",
            "url": "https://www.wqu.edu",
            "skills": "Quantitative Finance,Data science in Finance, Risk Management, Algorithmic Trading, Financial Modeling"
        },
        {
            "id": 2,
            "type": "degree",
            "icon": "fas fa-graduation-cap",
            "date": "2021 - 2025",
            "name": "BSc Applied Statistics with Programming",
            "institution": "Murang'a University of Technology",
            "description": "Bachelor of Science in Applied Statistics with Programming. Specialized in statistical analysis, data science, and programming applications for real-world problems.",
            "badge": "Second Class Honors (Upper Division)",
            "credentialId": "MUT-BSC-ASP",
            "url": "https://www.mut.ac.ke",
            "skills": "Statistical Analysis, Data Science, Programming, Research Methods"
        },
        {
            "id": 3,
            "type": "certification",
            "icon": "fas fa-certificate",
            "date": "2024",
            "name": "Introduction to Data Science",
            "institution": "Cisco Networking Academy",
            "description": "Fundamental concepts of data science including data collection, cleaning, analysis, and visualization techniques.",
            "badge": "Cisco Certified",
            "credentialId": "CISCO-DS-INTRO",
            "url": "#",
            "skills": "Data Science Fundamentals, Data Cleaning, Basic Analysis"
        },
        {
            "id": 4,
            "type": "certification",
            "icon": "fas fa-certificate",
            "date": "2023",
            "name": "Data Analysis Essentials",
            "institution": "Cisco Networking Academy",
            "description": "Comprehensive data analysis training covering statistical methods, data visualization, and analytical tools for business intelligence.",
            "badge": "Cisco Certified",
            "credentialId": "CISCO-DA-ESSENTIALS",
            "url": "#",
            "skills": "Data Analysis, Statistical Methods, Business Intelligence"
        },
        {
            "id": 5,
            "type": "certification",
            "icon": "fas fa-chart-bar",
            "date": "2022",
            "name": "STATA & SPSS Certification",
            "institution": "KEPSA Research Center",
            "description": "Professional certification in statistical software packages STATA and SPSS for advanced data analysis and research applications.",
            "badge": "Professional Certification",
            "credentialId": "KEPSA-STAT-SPSS",
            "url": "#",
            "skills": "STATA, SPSS, Statistical Software, Research Analysis"
        },
        {
            "id": 6,
            "type": "certification",
            "icon": "fas fa-brain",
            "date": "2024", // Changed from 2026 to 2024
            "name": "Machine Learning for Data Science",
            "institution": "IBM",
            "description": "IBM certification covering machine learning algorithms, model development, and implementation for data science applications.",
            "badge": "IBM Professional Certificate",
            "credentialId": "IBM-ML-DS",
            "url": "#",
            "skills": "Machine Learning, Predictive Modeling, AI Algorithms"
        },
        {
            "id": 7,
            "type": "certification",
            "icon": "fas fa-robot",
            "date": "2024",
            "name": "AI Fundamentals",
            "institution": "IBM",
            "description": "Foundational certification in Artificial Intelligence covering AI concepts, applications, and ethical considerations.",
            "badge": "IBM Professional Certificate",
            "credentialId": "IBM-AI-FUNDAMENTALS",
            "url": "#",
            "skills": "Artificial Intelligence, AI Concepts, Ethical AI"
        },
        {
            "id": 8,
            "type": "certification",
            "icon": "fas fa-chart-line",
            "date": "2023",
            "name": "AI for Data Analysis Interview",
            "institution": "Micro1",
            "description": "Specialized certification in using AI tools and techniques for data analysis, with focus on interview preparation and practical applications.",
            "badge": "Micro1 Certified",
            "credentialId": "MICRO1-AI-DA",
            "url": "#",
            "skills": "AI Tools, Data Analysis, Interview Preparation"
        }
    ]
};

// Load certifications data and render education cards
async function loadCertifications() {
    try {
        const educationGrid = document.getElementById('educationGrid');
        
        if (!educationGrid) {
            console.error('Education grid element not found');
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
            console.warn('Could not load from JSON file, using fallback data:', fetchError.message);
            data = fallbackCertifications;
        }
        
        // Clear any existing content
        educationGrid.innerHTML = '';
        
        // Helper function to parse date for sorting
        function parseDate(dateStr) {
            // Handle "2025 - Present" format
            if (dateStr.includes('Present')) {
                const year = parseInt(dateStr.split(' - ')[0]);
                return new Date(year, 11, 31);
            }
            // Handle "2021 - 2025" format
            if (dateStr.includes(' - ')) {
                const endYear = parseInt(dateStr.split(' - ')[1]);
                return new Date(endYear, 11, 31);
            }
            // Handle single year "2024"
            return new Date(parseInt(dateStr), 11, 31);
        }
        
        // Sort certifications: ongoing first, then by end date (newest first)
        const sortedCerts = data.certifications.sort((a, b) => {
            // Prioritize ongoing studies
            if (a.type === 'ongoing' && b.type !== 'ongoing') return -1;
            if (b.type === 'ongoing' && a.type !== 'ongoing') return 1;
            
            // Then by end date (newest first)
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateB - dateA;
        });
        
        sortedCerts.forEach(cert => {
            const certCard = document.createElement('div');
            certCard.className = 'education-card fade-in';
            certCard.setAttribute('data-cert-id', cert.id);
            
            // Add type-specific class for styling
            if (cert.type === 'ongoing') {
                certCard.classList.add('ongoing-card');
            }
            
            certCard.innerHTML = `
                <div class="education-icon">
                    <i class="${cert.icon}"></i>
                </div>
                <div class="education-date">
                    ${cert.date}
                    ${cert.type === 'ongoing' ? '<span class="ongoing-badge">Current</span>' : ''}
                </div>
                <h3>${cert.name}</h3>
                <h4>${cert.institution}</h4>
                <p>${cert.description}</p>
                <div class="cert-badge" data-cert-id="${cert.id}">
                    ${cert.badge}
                    ${cert.type === 'ongoing' ? '<i class="fas fa-sync-alt ongoing-icon"></i>' : ''}
                </div>
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
                    }, index * 150);
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
                    <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: rgba(100, 255, 218, 0.1); color: #64ffda; border: 1px solid rgba(100, 255, 218, 0.3); border-radius: 5px; cursor: pointer;">
                        <i class="fas fa-redo"></i> Retry Loading
                    </button>
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

// Initialize education animations
function initEducationAnimations() {
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const cardVisible = 100;
        
        if (cardTop < window.innerHeight - cardVisible) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 150);
        }
    });
}

// Show error function
function showError(error) {
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
