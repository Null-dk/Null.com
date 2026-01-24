/**
 * Null Incorporated - Interactive Effects
 * Modern, performant animations and interactions
 */

(function() {
    'use strict';

    // Feature detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Smooth RAF-based animations
    let rafId = null;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let currentGridSize = 24;
    let targetGridSize = 24;

    /**
     * Initialize all effects when DOM is ready
     */
    function init() {
        initMouseTracking();
        initCardInteractions();
        initGlitchEffects();
        initUptimeDisplay();
        initTickerDuplication();
        initIntersectionObserver();
    }

    /**
     * Mouse tracking for dynamic grid effect
     */
    function initMouseTracking() {
        if (isTouchDevice || prefersReducedMotion) return;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            targetGridSize = 20 + mouseX * 8;
        }, { passive: true });

        // Smooth animation loop
        function animateGrid() {
            // Lerp for smooth transition
            currentGridSize += (targetGridSize - currentGridSize) * 0.08;
            document.documentElement.style.setProperty('--grid-size', `${currentGridSize}px`);
            rafId = requestAnimationFrame(animateGrid);
        }

        animateGrid();
    }

    /**
     * Enhanced card interactions with spring-like feedback
     */
    function initCardInteractions() {
        const cards = document.querySelectorAll('.domain-card:not(.offline):not(.placeholder-card)');

        cards.forEach((card, index) => {
            // Add card index numbers
            const indexEl = document.createElement('span');
            indexEl.className = 'card-index';
            indexEl.textContent = String(index + 1).padStart(2, '0');
            card.appendChild(indexEl);

            // Mouse enter/leave for subtle tilt effect (non-touch only)
            if (!isTouchDevice && !prefersReducedMotion) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;

                    // Subtle 3D tilt
                    const tiltX = y * 4;
                    const tiltY = -x * 4;

                    card.style.transform = `
                        translateY(-6px)
                        perspective(1000px)
                        rotateX(${tiltX}deg)
                        rotateY(${tiltY}deg)
                    `;
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                }, { passive: true });
            }

            // Click/tap feedback
            card.addEventListener('mousedown', function() {
                this.style.transform = 'translateY(-2px) scale(0.98)';
            });

            card.addEventListener('mouseup', function() {
                this.style.transform = '';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    /**
     * Random glitch effects on domain names
     */
    function initGlitchEffects() {
        if (prefersReducedMotion) return;

        function triggerGlitch() {
            const domains = document.querySelectorAll('.domain-card:not(.offline):not(.placeholder-card) .domain-name');
            if (domains.length === 0) return;

            const randomIndex = Math.floor(Math.random() * domains.length);
            const domain = domains[randomIndex];

            // Multi-step glitch animation
            const glitchSteps = [
                { transform: 'translateX(3px) skewX(-2deg)', opacity: '0.85', duration: 50 },
                { transform: 'translateX(-2px) skewX(1deg)', opacity: '0.9', duration: 50 },
                { transform: 'translateX(1px)', opacity: '0.95', duration: 40 },
                { transform: '', opacity: '', duration: 0 }
            ];

            let stepIndex = 0;
            function runStep() {
                if (stepIndex >= glitchSteps.length) return;

                const step = glitchSteps[stepIndex];
                domain.style.transform = step.transform;
                domain.style.opacity = step.opacity;

                if (step.duration > 0) {
                    stepIndex++;
                    setTimeout(runStep, step.duration);
                }
            }

            runStep();

            // Schedule next glitch
            const nextDelay = Math.random() * 8000 + 4000;
            setTimeout(triggerGlitch, nextDelay);
        }

        // Start after initial load
        setTimeout(triggerGlitch, 3000);
    }

    /**
     * Dynamic uptime display
     */
    function initUptimeDisplay() {
        const uptimeEl = document.getElementById('uptime');
        if (!uptimeEl) return;

        function updateUptime() {
            const baseUptime = 99.7;
            const variation = (Math.random() - 0.5) * 0.15;
            const uptime = Math.max(99.0, Math.min(99.99, baseUptime + variation));

            // Animate the number change
            uptimeEl.style.transition = 'opacity 150ms ease';
            uptimeEl.style.opacity = '0.5';

            setTimeout(() => {
                uptimeEl.textContent = uptime.toFixed(2) + '%';
                uptimeEl.style.opacity = '1';
            }, 150);
        }

        updateUptime();
        setInterval(updateUptime, 20000);
    }

    /**
     * Duplicate ticker content for seamless infinite scroll
     */
    function initTickerDuplication() {
        const tickerTrack = document.querySelector('.ticker-track');
        const tickerContent = document.querySelector('.ticker-content');

        if (tickerTrack && tickerContent) {
            // Clone content for seamless loop
            const clone = tickerContent.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            tickerTrack.appendChild(clone);
        }
    }

    /**
     * Intersection Observer for scroll-triggered animations
     */
    function initIntersectionObserver() {
        if (prefersReducedMotion) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);

        // Observe cards for reveal animations
        document.querySelectorAll('.domain-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Cleanup on page unload
     */
    function cleanup() {
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);

    // Handle visibility change to pause/resume animations
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!document.hidden && !rafId && !isTouchDevice && !prefersReducedMotion) {
            initMouseTracking();
        }
    });

})();
