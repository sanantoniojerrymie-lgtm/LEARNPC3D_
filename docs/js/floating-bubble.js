// Floating Market Bubble Click Handler
document.addEventListener('DOMContentLoaded', function() {
  const bubble = document.querySelector('.floating-bubble');
  if (bubble) {
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'mm.html';
    });
    
    
    bubble.setAttribute('role', 'button');
    bubble.setAttribute('aria-label', 'Go to Market - Buy Components');
    bubble.tabIndex = 0;
    
    bubble.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'mm.html';
      }
    });
  }
});
