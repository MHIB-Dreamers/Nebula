// Create twinkling stars effect
function createStars() {
    const container = document.getElementById('stars-container');
    const numStars = 200; // Number of stars to create
    
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3;
        
        // Random animation duration
        const duration = 2 + Math.random() * 3;
        
        // Set star styles
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        container.appendChild(star);
    }
}

// Initialize stars when the page loads
window.addEventListener('load', createStars); 