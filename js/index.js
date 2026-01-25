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
    let currentGridSize = 24;
    let targetGridSize = 24;

    function init() {
        initMouseTracking();
        initCardInteractions();
        initGlitchEffects();
        initUptimeDisplay();
        initTickerDuplication();
        initIntersectionObserver();
    }

    function initMouseTracking() {
        if (isTouchDevice || prefersReducedMotion) return;

        document.addEventListener('mousemove', (e) => {
            targetGridSize = 20 + (e.clientX / window.innerWidth) * 8;
        }, { passive: true });

        function animateGrid() {
            currentGridSize += (targetGridSize - currentGridSize) * 0.08;
            document.documentElement.style.setProperty('--grid-size', `${currentGridSize}px`);
            rafId = requestAnimationFrame(animateGrid);
        }

        animateGrid();
    }

    function initCardInteractions() {
        const cards = document.querySelectorAll('.domain-card:not(.offline):not(.placeholder-card)');

        cards.forEach((card, index) => {
            const indexEl = document.createElement('span');
            indexEl.className = 'card-index';
            indexEl.textContent = String(index + 1).padStart(2, '0');
            card.appendChild(indexEl);

            if (!isTouchDevice && !prefersReducedMotion) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${y * 4}deg) rotateY(${-x * 4}deg)`;
                }, { passive: true });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = '';
                }, { passive: true });
            }

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

    function initGlitchEffects() {
        if (prefersReducedMotion) return;

        function triggerGlitch() {
            const domains = document.querySelectorAll('.domain-card:not(.offline):not(.placeholder-card) .domain-name');
            if (domains.length === 0) return;

            const domain = domains[Math.floor(Math.random() * domains.length)];
            const steps = [
                { transform: 'translateX(3px) skewX(-2deg)', opacity: '0.85', duration: 50 },
                { transform: 'translateX(-2px) skewX(1deg)', opacity: '0.9', duration: 50 },
                { transform: 'translateX(1px)', opacity: '0.95', duration: 40 },
                { transform: '', opacity: '', duration: 0 }
            ];

            let i = 0;
            function runStep() {
                if (i >= steps.length) return;
                domain.style.transform = steps[i].transform;
                domain.style.opacity = steps[i].opacity;
                if (steps[i].duration > 0) {
                    i++;
                    setTimeout(runStep, steps[i - 1].duration);
                }
            }
            runStep();

            setTimeout(triggerGlitch, Math.random() * 8000 + 4000);
        }

        setTimeout(triggerGlitch, 3000);
    }

    function initUptimeDisplay() {
        const uptimeEl = document.getElementById('uptime');
        if (!uptimeEl) return;

        function updateUptime() {
            const uptime = Math.max(99.0, Math.min(99.99, 99.7 + (Math.random() - 0.5) * 0.15));
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

    function initTickerDuplication() {
        const tickerTrack = document.querySelector('.ticker-track');
        const tickerContent = document.querySelector('.ticker-content');

        if (tickerTrack && tickerContent) {
            const clone = tickerContent.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            tickerTrack.appendChild(clone);
        }
    }

    function initIntersectionObserver() {
        if (prefersReducedMotion) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.domain-card').forEach(card => {
            observer.observe(card);
        });
    }

    function cleanup() {
        if (rafId) cancelAnimationFrame(rafId);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('unload', cleanup);

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        } else if (!document.hidden && !rafId && !isTouchDevice && !prefersReducedMotion) {
            initMouseTracking();
        }
    });

})();
