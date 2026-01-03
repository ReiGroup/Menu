/* ============================================
   COFFEE MENU - SPECIFIC FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize coffee menu
  if (typeof coffeeMenuData !== 'undefined' && coffeeMenuData.items.length > 0) {
    setMenuData(coffeeMenuData);
  } else {
    // Show placeholder message
    const container = document.getElementById('menuContainer');
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
          <p style="font-size: 1.2rem; color: var(--ingredients-color);">
            Menu items will be displayed here once data is provided.
          </p>
        </div>
      `;
    }
  }
});

