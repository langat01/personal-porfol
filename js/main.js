/* Add to existing @media (max-width: 992px) section */
@media (max-width: 992px) {
    /* ... existing code ... */
    
    .mobile-menu-btn {
        display: block !important;
    }
}

/* Add to existing @media (max-width: 768px) section */
@media (max-width: 768px) {
    /* ... existing code ... */
    
    .running-text {
        font-size: 0.8rem;
        animation: runText 20s linear infinite; /* Faster on mobile */
    }
    
    .hero-text h1 {
        font-size: 2.3rem;
    }
    
    .hero-text h2 {
        font-size: 1.8rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
    
    .section-subtitle {
        font-size: 1rem;
        padding: 0 15px;
    }
}
