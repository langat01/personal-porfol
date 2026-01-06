// Resume Download Functionality
function downloadResume() {
    const resumeContent = `
        WELDON LANGAT - DATA SCIENTIST
        =================================
        
        CONTACT INFORMATION
        --------------------
        Email: weldon.langat@example.com
        Phone: +254 700 000 000
        Location: Nairobi, Kenya
        LinkedIn: linkedin.com/in/weldonlangat
        GitHub: github.com/weldonlangat
        
        SUMMARY
        -------
        Data Scientist with 4+ years of experience in building predictive models, 
        implementing machine learning solutions, and extracting insights from complex 
        datasets. Specialized in Python, machine learning, data visualization, and 
        cloud technologies.
        
        EDUCATION
        ---------
        MSc Data Science | University of Nairobi (2021-2024)
        - Specialized in Machine Learning, Statistical Analysis
        - Graduated with Distinction (GPA: 3.9/4.0)
        
        BSc Computer Science | Kenyatta University (2017-2021)
        - Major in Artificial Intelligence and Data Mining
        - First Class Honors
        
        CERTIFICATIONS
        --------------
        • Google Data Analytics Certificate (2023)
        • Microsoft Azure Data Scientist Associate (2022)
        • AWS Certified Machine Learning Specialist (2022)
        
        EXPERIENCE
        ----------
        Senior Data Scientist | DataInsight Solutions (2025-Present)
        - Lead machine learning initiatives for client projects
        - Developed predictive models for financial forecasting
        - Mentored junior data scientists
        
        Data Scientist | TechAnalytics Inc. (2022-2025)
        - Built recommendation systems for e-commerce clients
        - Implemented NLP pipelines for healthcare applications
        - Improved operational efficiency by 30%
        
        Data Science Intern | AI Research Lab (2024)
        - Researched novel ML algorithms for time series forecasting
        - Published research paper on anomaly detection
        
        TECHNICAL SKILLS
        ----------------
        • Programming: Python, R, SQL, Java
        • Machine Learning: Scikit-learn, TensorFlow, PyTorch, XGBoost
        • Data Visualization: Tableau, Power BI, Matplotlib, Seaborn
        • Big Data: Apache Spark, Hadoop, Kafka
        • Cloud Platforms: AWS, Azure, Google Cloud
        • Databases: PostgreSQL, MongoDB, MySQL
        
        PROJECTS
        --------
        Healthcare Predictive Analytics (98% accuracy)
        - ML model predicting patient readmission risks
        - Reduced hospital costs by 15%
        
        E-commerce Recommendation System
        - Increased sales by 25% for online retailer
        - Collaborative filtering implementation
        
        Financial Fraud Detection System
        - 99.5% precision in identifying fraudulent transactions
        - Reduced false positives by 60%
    `;
    
    // Create a blob and download link
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Weldon_Langat_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show confirmation
    alert('Resume download started! In a real implementation, this would download a PDF file.');
}

// Attach resume download functionality to buttons
document.getElementById('downloadResume').addEventListener('click', function(e) {
    e.preventDefault();
    downloadResume();
});

document.getElementById('heroResumeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    downloadResume();
});
