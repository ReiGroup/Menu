/* ============================================
   PAGE TRANSITION - Quick Logo Flash
   Total time: ~0.5s
   ============================================ */

(function() {
  const transition = document.getElementById('pageTransition');
  const body = document.body;
  
  // On page load - fade in
  window.addEventListener('load', () => {
    body.classList.remove('page-entering');
    body.classList.add('page-ready');
  });
  
  // Intercept internal link clicks
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    if (!link) return;
    
    const href = link.getAttribute('href');
    
    // Skip external links, anchors, and javascript
    if (!href || 
        href.startsWith('http') || 
        href.startsWith('#') || 
        href.startsWith('javascript') ||
        href.startsWith('mailto') ||
        href.startsWith('tel') ||
        link.target === '_blank') {
      return;
    }
    
    // Prevent default navigation
    e.preventDefault();
    
    // Show transition
    if (transition) {
      transition.classList.add('active');
    }
    
    // Navigate after short delay
    setTimeout(() => {
      window.location.href = href;
    }, 250);
  });
})();

