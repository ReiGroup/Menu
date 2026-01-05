/* ============================================
   LOADING SCREEN WITH PROGRESS
   ============================================ */

// Track loading progress
let loadingProgress = 0;
let totalResources = 0;
let loadedResources = 0;

// Initialize loading screen
function initLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.getElementById('loadingProgressBar');
  const percentageText = document.getElementById('loadingPercentage');

  if (!loadingScreen || !progressBar || !percentageText) return;

  // Count resources to load
  const images = document.querySelectorAll('img');
  const scripts = document.querySelectorAll('script[src]');
  const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
  
  totalResources = images.length + scripts.length + stylesheets.length;

  // If no resources, hide immediately
  if (totalResources === 0) {
    hideLoadingScreen();
    return;
  }

  // Track image loading
  images.forEach((img) => {
    if (img.complete) {
      incrementProgress();
    } else {
      img.addEventListener('load', incrementProgress);
      img.addEventListener('error', incrementProgress); // Count errors as loaded
    }
  });

  // Track script loading
  scripts.forEach((script) => {
    if (script.src) {
      // Scripts are usually loaded by the time this runs, but check anyway
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        incrementProgress();
      } else {
        script.addEventListener('load', incrementProgress);
        script.addEventListener('error', incrementProgress);
      }
    }
  });

  // Track stylesheet loading
  stylesheets.forEach((link) => {
    if (link.href) {
      // Stylesheets are usually loaded quickly
      if (link.sheet) {
        incrementProgress();
      } else {
        link.addEventListener('load', incrementProgress);
        link.addEventListener('error', incrementProgress);
      }
    }
  });

  // Fallback: hide after 3 seconds max (even if not all resources loaded)
  setTimeout(() => {
    if (loadingScreen && !loadingScreen.classList.contains('hidden')) {
      hideLoadingScreen();
    }
  }, 3000);

  // Also hide when DOM is ready
  if (document.readyState === 'complete') {
    setTimeout(hideLoadingScreen, 500);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 500);
    });
  }
}

// Increment progress
function incrementProgress() {
  loadedResources++;
  loadingProgress = Math.min(100, Math.round((loadedResources / totalResources) * 100));
  
  updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
  const progressBar = document.getElementById('loadingProgressBar');
  const percentageText = document.getElementById('loadingPercentage');

  if (progressBar) {
    progressBar.style.width = loadingProgress + '%';
  }

  if (percentageText) {
    percentageText.textContent = loadingProgress + '%';
  }
}

// Hide loading screen
function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      if (loadingScreen.parentNode) {
        loadingScreen.remove();
      }
    }, 500);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
  initLoadingScreen();
}

