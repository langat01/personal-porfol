// Function to load certifications from JSON file
async function loadCertifications() {
    try {
        const response = await fetch('certifications.json');
        const data = await response.json();
        const certifications = data.certifications; // Access the array
        
        const educationGrid = document.getElementById('educationGrid');
        
        // Clear any existing loading/error messages
        educationGrid.innerHTML = '';
        
        certifications.forEach(cert => {
            const card = document.createElement('div');
            card.className = 'education-card fade-in';
            card.setAttribute('data-type', cert.type);
            
            // Format skills as badges
            const skillsArray = cert.skills.split(', ');
            const skillsHTML = skillsArray.map(skill => 
                `<span class="skill-tag">${skill.trim()}</span>`
            ).join('');
            
            card.innerHTML = `
                <div class="edu-icon">
                    <i class="${cert.icon}"></i>
                </div>
                <div class="edu-content">
                    <span class="edu-badge">${cert.badge}</span>
                    <span class="edu-date">${cert.date}</span>
                    <h3 class="edu-title">${cert.name}</h3>
                    <p class="edu-institution">
                        <i class="fas fa-university"></i> ${cert.institution}
                    </p>
                    <p class="edu-description">${cert.description}</p>
                    <div class="edu-skills">
                        ${skillsHTML}
                    </div>
                    <div class="edu-actions">
                        <button class="btn-secondary view-cert-btn" data-id="${cert.id}">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                        ${cert.url ? `<a href="${cert.url}" class="btn-tertiary" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Verify
                        </a>` : ''}
                    </div>
                </div>
            `;
            
            educationGrid.appendChild(card);
        });
        
        // Add event listeners to "View Details" buttons
        document.querySelectorAll('.view-cert-btn').forEach(button => {
            button.addEventListener('click', function() {
                const certId = parseInt(this.getAttribute('data-id'));
                const cert = certifications.find(c => c.id === certId);
                if (cert) {
                    openCertModal(cert);
                }
            });
        });
        
    } catch (error) {
        console.error('Error loading certifications:', error);
        document.getElementById('educationGrid').innerHTML = 
            '<div class="error-message"><i class="fas fa-exclamation-triangle"></i> Unable to load education and certifications data. Please try again later.</div>';
    }
}

// Function to open the certification modal with full details
function openCertModal(cert) {
    const modal = document.getElementById('certModal');
    
    // Format skills for modal display
    const skillsArray = cert.skills.split(', ');
    const skillsHTML = skillsArray.map(skill => 
        `<span class="modal-skill">${skill.trim()}</span>`
    ).join('');
    
    // Update modal content
    document.getElementById('certModalTitle').textContent = 
        cert.type === 'degree' ? 'Education Details' : 'Certification Details';
    
    document.getElementById('certName').textContent = cert.name;
    document.getElementById('certOrg').textContent = cert.institution;
    document.getElementById('certDate').textContent = cert.date;
    document.getElementById('certId').textContent = cert.credentialId;
    
    const certUrlElement = document.getElementById('certUrl');
    if (cert.url) {
        certUrlElement.href = cert.url;
        certUrlElement.style.display = 'inline';
        certUrlElement.innerHTML = `<i class="fas fa-external-link-alt"></i> Verify Credential`;
    } else {
        certUrlElement.style.display = 'none';
    }
    
    document.getElementById('certSkills').innerHTML = skillsHTML;
    document.getElementById('certDescription').textContent = cert.description;
    
    // Update badge/status in modal
    const badgeInfo = document.createElement('div');
    badgeInfo.className = 'cert-badge-info';
    badgeInfo.innerHTML = `<strong>Status:</strong> <span class="badge-status">${cert.badge}</span>`;
    document.querySelector('.cert-info').prepend(badgeInfo);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add type-specific styling
    modal.setAttribute('data-cert-type', cert.type);
}

// Function to close modal
function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clean up modal content
    const existingBadge = document.querySelector('.cert-badge-info');
    if (existingBadge) {
        existingBadge.remove();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', loadCertifications);

document.getElementById('closeCertModal').addEventListener('click', closeCertModal);

// Close modal when clicking outside
document.getElementById('certModal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeCertModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('certModal');
    if (event.key === 'Escape' && modal.style.display === 'flex') {
        closeCertModal();
    }
});
