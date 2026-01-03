/* ============================================
   ANIMATIONS - REVIEW BUTTON & SMOOTH EFFECTS
   ============================================ */

// Show Review Button after 20 seconds
function initReviewButton() {
  const reviewButton = document.getElementById('reviewButton');
  if (!reviewButton) return;
  
  setTimeout(() => {
    reviewButton.classList.add('visible');
  }, 20000); // 20 seconds
}

// Smooth scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe menu items
  document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initReviewButton();
  
  // Delay scroll animations slightly
  setTimeout(() => {
    initScrollAnimations();
  }, 100);
});

