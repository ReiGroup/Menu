/* ============================================
   MODAL - ITEM DETAIL VIEW
   (Legacy - now using expandMenuItem in filters.js)
   ============================================ */

// Open Item Modal (kept for backward compatibility)
function openItemModal(item) {
  // This function is deprecated - use expandMenuItem from filters.js
  console.log('openItemModal called - use expandMenuItem instead');
}

// Close Item Modal
function closeItemModal() {
  const modal = document.getElementById('itemModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize - no longer creates modal HTML since we use in-place expand
document.addEventListener('DOMContentLoaded', () => {
  // Modal creation removed - using expandMenuItem instead
});
