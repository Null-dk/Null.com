document.addEventListener('DOMContentLoaded', function() {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Simple mouse tracking for grid size only
    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const gridSize = 20 + x * 6;
            document.documentElement.style.setProperty('--grid-size', `${gridSize}px`);
        });
    }
    
    // Simple domain card interactions
    document.querySelectorAll('.domain-card:not(.offline):not(.placeholder-card)').forEach(card => {
        card.addEventListener('mousedown', function(e) {
            this.style.transform = 'translateY(-4px) scale(0.98)';
        });
        
        card.addEventListener('mouseup', function(e) {
            this.style.transform = '';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
    });
    
    // Simple random glitch effects
    function randomGlitch() {
        const domains = document.querySelectorAll('.domain-name');
        const randomIndex = Math.floor(Math.random() * domains.length);
        const domain = domains[randomIndex];
        
        if (domain && !domain.closest('.offline') && !domain.closest('.placeholder-card')) {
            domain.style.transform = 'translateX(2px)';
            domain.style.opacity = '0.9';
            
            setTimeout(() => {
                domain.style.transform = '';
                domain.style.opacity = '';
            }, 120);
        }
        
        setTimeout(randomGlitch, Math.random() * 10000 + 5000);
    }
    
    // Simple uptime display
    function updateUptime() {
        const uptimeEl = document.getElementById('uptime');
        if (uptimeEl) {
            const baseUptime = 99.7;
            const variation = (Math.random() - 0.5) * 0.1;
            const uptime = Math.max(99.0, Math.min(99.9, baseUptime + variation));
            uptimeEl.textContent = uptime.toFixed(1) + '%';
        }
    }
    
    // Initialize effects
    setTimeout(randomGlitch, 4000);
    updateUptime();
    setInterval(updateUptime, 30000);
});