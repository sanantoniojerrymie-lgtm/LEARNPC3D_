(function() {
    'use strict';

    function initLoader() {
        const introLoader = document.querySelector('.intro-loader');
        if (!introLoader) return;

        // Prevent scrolling while loader is visible
        document.body.style.overflow = 'hidden';

        function hideLoader() {
            introLoader.classList.add('fade-out');
        }

        function onTransitionEnd(e) {
            if (e.propertyName === 'opacity' && introLoader.classList.contains('fade-out')) {
                introLoader.classList.add('hidden');
                document.body.style.overflow = '';
                introLoader.removeEventListener('transitionend', onTransitionEnd);
            }
        }

        introLoader.addEventListener('transitionend', onTransitionEnd);

        // Fallback: ensure loader is hidden even if transitionend doesn't fire
        setTimeout(function() {
            if (!introLoader.classList.contains('hidden')) {
                introLoader.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 4000);

        // Start fade-out after 2.5 seconds
        setTimeout(hideLoader, 2500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }
})();
