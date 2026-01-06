// Load projects data and render project cards
async function loadProjects() {
    try {
        const response = await fetch('data/projects.json');
        const data = await response.json();
        const projectsGrid = document.getElementById('projectsGrid');
        
        data.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            projectCard.setAttribute('data-project-id', project.id);
            
            // Create technologies tags
            const techTags = project.technologies.map(tech => 
                `<span class="tag">${tech}</span>`
            ).join('');
            
            projectCard.innerHTML = `
                <div class="project-img">
                    <i class="${project.icon}"></i>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${techTags}
                    </div>
                    <div class="project-actions">
                        <a href="#" class="project-btn view-project" data-project-id="${project.id}">
                            <i class="fas fa-eye"></i> View Details
                        </a>
                        <a href="${project.github}" class="project-btn" target="_blank">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                        <a href="#" class="project-btn view-report" data-project-id="${project.id}">
                            <i class="fas fa-chart-bar"></i> Report
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Re-initialize scroll animations for newly added cards
        setTimeout(() => {
            const newProjectCards = document.querySelectorAll('.project-card');
            newProjectCards.forEach((card, index) => {
                const cardTop = card.getBoundingClientRect().top;
                const cardVisible = 100;
                
                if (cardTop < window.innerHeight - cardVisible) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                }
            });
            
            // Re-attach event listeners to new project buttons
            attachProjectListeners();
        }, 100);
        
    } catch (error) {
        console.error('Error loading projects:', error);
        document.getElementById('projectsGrid').innerHTML = `
            <div style="text-align: center; padding: 40px; color: #8892b0;">
                <i class="fas fa-exclamation-circle" style="font-size: 48px; margin-bottom: 20px;"></i>
                <p>Unable to load projects. Please check your connection and try again.</p>
            </div>
        `;
    }
}

// Project Modal Functionality
const projectModal = document.getElementById('projectModal');
const closeProjectModal = document.getElementById('closeProjectModal');
const projectTabs = document.querySelectorAll('.project-tab');
const tabContents = document.querySelectorAll('.tab-content');

// Project data loaded from JSON
let projectsData = {};

// Open project modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    
    if (project) {
        // Set modal content
        document.getElementById('projectModalTitle').textContent = project.title;
        document.getElementById('projectOverview').textContent = project.overview;
        document.getElementById('projectReportSummary').textContent = project.reportSummary;
        document.getElementById('projectImpact').textContent = project.impact;
        document.getElementById('projectGitHubLink').href = project.github;
        document.getElementById('liveDemoLink').href = project.liveDemo;
        document.getElementById('demoVideoLink').href = project.demoVideo;
        document.getElementById('demoNotebookLink').href = project.demoNotebook;
        document.getElementById('projectCode').textContent = project.codePreview;
        
        // Set technologies
        const techContainer = document.getElementById('projectTech');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });
        
        // Set features
        const featuresContainer = document.getElementById('projectFeatures');
        featuresContainer.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresContainer.appendChild(li);
        });
        
        // Set metrics
        const metricsContainer = document.getElementById('projectMetrics');
        metricsContainer.innerHTML = '';
        project.metrics.forEach(metric => {
            const li = document.createElement('li');
            li.textContent = metric;
            metricsContainer.appendChild(li);
        });
        
        // Set challenges
        const challengesContainer = document.getElementById('projectChallenges');
        challengesContainer.innerHTML = '';
        project.challenges.forEach(challenge => {
            const li = document.createElement('li');
            li.textContent = challenge;
            challengesContainer.appendChild(li);
        });
        
        // Show modal
        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Reset to overview tab
        switchTab('overview');
    }
}

// Close project modal
function closeProjectModalFunc() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Switch between tabs
function switchTab(tabName) {
    // Remove active class from all tabs and contents
    projectTabs.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`.project-tab[data-tab="${tabName}"]`);
    const selectedContent = document.getElementById(`${tabName}Tab`);
    
    if (selectedTab && selectedContent) {
        selectedTab.classList.add('active');
        selectedContent.classList.add('active');
    }
}

// Attach event listeners to project buttons
function attachProjectListeners() {
    const viewProjectButtons = document.querySelectorAll('.view-project');
    const viewReportButtons = document.querySelectorAll('.view-report');
    
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project-id');
            openProjectModal(projectId);
        });
    });
    
    viewReportButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project-id');
            openProjectModal(projectId);
            
            // Switch to report tab after a short delay
            setTimeout(() => {
                switchTab('report');
            }, 300);
        });
    });
}

// Set up tab switching
projectTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
    });
});

// Load projects data and set up modal
async function initializeProjects() {
    try {
        // Load projects data
        const response = await fetch('data/projects.json');
        const data = await response.json();
        
        // Convert array to object with id as key
        data.projects.forEach(project => {
            projectsData[project.id] = project;
        });
        
        // Render projects
        await loadProjects();
        
        // Set up modal close events
        closeProjectModal.addEventListener('click', closeProjectModalFunc);
        
        projectModal.addEventListener('click', function(e) {
            if (e.target === projectModal) {
                closeProjectModalFunc();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && projectModal.classList.contains('active')) {
                closeProjectModalFunc();
            }
        });
        
    } catch (error) {
        console.error('Error initializing projects:', error);
    }
}

// Initialize projects when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjects);
