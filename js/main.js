/* ============================================
   MAIN JAVASCRIPT - CART FUNCTIONALITY
   ============================================ */

// Cart State
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let appliedDiscount = 0;
let appliedCouponCode = "";

// Initialize Cart
function initCart() {
  updateCartIcon();
  setupCartEventListeners();
}

// Setup Cart Event Listeners
function setupCartEventListeners() {
  const cartIcon = document.getElementById("cartIcon");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartSidebar = document.getElementById("cartSidebar");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const applyCouponBtn = document.getElementById("applyCouponBtn");

  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      // Close any open modal/expanded item first
      if (typeof closeExpandedClone === "function") {
        closeExpandedClone();
      }

      // Hide the cart icon when cart is open
      cartIcon.style.opacity = "0";
      cartIcon.style.pointerEvents = "none";

      cartSidebar.classList.add("open");
      cartOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      renderCart();
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCart);
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", applyCoupon);
  }
}

// Close Cart
function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartIcon = document.getElementById("cartIcon");

  if (cartSidebar) cartSidebar.classList.remove("open");
  if (cartOverlay) cartOverlay.classList.remove("active");
  document.body.style.overflow = "";

  // Show cart icon again
  if (cartIcon) {
    cartIcon.style.opacity = "";
    cartIcon.style.pointerEvents = "";
  }
}

// Add to Cart with fly animation
function addToCart(item, sourceElement) {
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart();

  // Animate item flying to cart
  if (sourceElement) {
    animateFlyToCart(sourceElement, item.name);
  } else {
    showCartNotification(item.name);
    updateCartIcon();
  }
}

// Remove from Cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveCart();
  updateCartIcon();
  renderCart();
}

// Update Quantity
function updateQuantity(itemId, change) {
  const item = cart.find((cartItem) => cartItem.id === itemId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    saveCart();
    updateCartIcon();
    renderCart();
  }
}

// Save Cart to LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Update Cart Icon
function updateCartIcon() {
  const cartIcon = document.getElementById("cartIcon");
  const cartBadge = document.getElementById("cartBadge");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartIcon && cartBadge) {
    cartBadge.textContent = totalItems;

    if (totalItems > 0) {
      cartIcon.classList.add("visible");
    } else {
      cartIcon.classList.remove("visible");
    }
  }
}

// Render Cart
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartCount = document.getElementById("cartCount");

  // Calculate total items count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Update cart count display
  if (cartCount) {
    cartCount.textContent =
      totalItems > 0 ? `(${totalItems} item${totalItems > 1 ? "s" : ""})` : "";
  }

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p class="empty-cart-message">Your cart is empty</p>
      </div>
    `;
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      return `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-pricing">
            <span class="cart-item-unit-price">$${item.price.toFixed(
              2
            )} each</span>
            ${
              item.quantity > 1
                ? `<span class="cart-item-total-price">= $${itemTotal.toFixed(
                    2
                  )}</span>`
                : ""
            }
          </div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="updateQuantity('${
              item.id
            }', -1)">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" onclick="updateQuantity('${
              item.id
            }', 1)">+</button>
          </div>
        </div>
        <button class="remove-item-btn" onclick="removeFromCart('${
          item.id
        }')" title="Remove">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </div>
    `;
    })
    .join("");

  // Show total with discount if applied
  if (appliedDiscount > 0) {
    const discountAmount = total * appliedDiscount;
    const finalTotal = total - discountAmount;
    cartTotal.innerHTML = `
      <span class="original-price">$${total.toFixed(2)}</span>
      <span class="discounted-price">$${finalTotal.toFixed(2)}</span>
      <span class="discount-badge">-${(appliedDiscount * 100).toFixed(
        0
      )}%</span>
    `;
  } else {
    cartTotal.textContent = `$${total.toFixed(2)}`;
  }
}

// Apply Coupon
function applyCoupon() {
  const couponInput = document.getElementById("couponInput");
  const couponMessage = document.getElementById("couponMessage");

  if (!couponInput || !couponMessage) return;

  const couponCode = couponInput.value.trim().toUpperCase();

  // Add your coupon logic here
  if (couponCode === "") {
    couponMessage.textContent = "Please enter a coupon code";
    couponMessage.className = "coupon-message error";
    return;
  }

  // Example coupon codes (replace with your actual logic)
  const validCoupons = {
    // 'WELCOME10': 0.1,
    // 'SAVE20': 0.2
  };

  if (validCoupons[couponCode]) {
    appliedDiscount = validCoupons[couponCode];
    appliedCouponCode = couponCode;
    couponMessage.textContent = `Coupon "${couponCode}" applied! ${
      appliedDiscount * 100
    }% off`;
    couponMessage.className = "coupon-message success";
    renderCart(); // Re-render to show discounted price
  } else {
    couponMessage.textContent = "Invalid coupon code";
    couponMessage.className = "coupon-message error";
  }
}

// Animate fly to cart
function animateFlyToCart(sourceElement, itemName) {
  const cartIcon = document.getElementById("cartIcon");
  if (!cartIcon) {
    showCartNotification(itemName);
    updateCartIcon();
    return;
  }

  // Get positions
  const sourceRect = sourceElement.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  // Create flying element
  const flyingEl = document.createElement("div");
  flyingEl.className = "flying-item";

  // If source has an image, clone it
  const sourceImg = sourceElement.querySelector("img");
  if (sourceImg) {
    const img = document.createElement("img");
    img.src = sourceImg.src;
    img.alt = "";
    flyingEl.appendChild(img);
  } else {
    // Use item name as flying text
    flyingEl.className = "flying-item flying-text";
    flyingEl.innerHTML = `<span>${itemName}</span>`;
  }

  // Set initial position and size
  flyingEl.style.cssText = `
    position: fixed;
    z-index: 9999;
    width: ${Math.min(sourceRect.width, 80)}px;
    height: ${Math.min(sourceRect.height, 80)}px;
    left: ${sourceRect.left + sourceRect.width / 2}px;
    top: ${sourceRect.top + sourceRect.height / 2}px;
    transform: translate(-50%, -50%) scale(1);
    pointer-events: none;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(228, 194, 122, 0.5);
    opacity: 1;
    transition: none;
  `;

  const innerEl = flyingEl.querySelector("img, span");
  if (innerEl) {
    if (innerEl.tagName === "IMG") {
      innerEl.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
      `;
    } else {
      innerEl.style.cssText = `
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Sirin Stencil', cursive;
        font-size: 12px;
        color: #574432;
        text-align: center;
        padding: 5px;
        line-height: 1.2;
        word-break: break-word;
      `;
    }
  }

  document.body.appendChild(flyingEl);

  // Calculate target position (cart icon center)
  const targetX = cartRect.left + cartRect.width / 2;
  const targetY = cartRect.top + cartRect.height / 2;

  // Force reflow
  flyingEl.offsetHeight;

  // Animate to cart
  flyingEl.style.transition = "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  flyingEl.style.left = `${targetX}px`;
  flyingEl.style.top = `${targetY}px`;
  flyingEl.style.transform = "translate(-50%, -50%) scale(0.2)";
  flyingEl.style.opacity = "0.8";

  // On animation end
  setTimeout(() => {
    flyingEl.remove();

    // Bounce the cart icon
    cartIcon.classList.add("cart-bounce");
    setTimeout(() => cartIcon.classList.remove("cart-bounce"), 400);

    // Update cart and show notification
    updateCartIcon();
    showCartNotification(itemName);
  }, 600);
}

// Show Cart Notification
function showCartNotification(itemName) {
  // Remove any existing notifications
  const existingNotification = document.querySelector(".cart-notification");
  if (existingNotification) existingNotification.remove();

  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.textContent = itemName || "Added to cart";
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    background: #574432;
    color: white;
    padding: 0.8rem 1.2rem;
    border-radius: 6px;
    z-index: 2200;
    font-family: 'Playfair Display', serif;
    font-size: 0.9rem;
    box-shadow: 0 4px 15px rgba(87, 68, 50, 0.3);
    animation: slideInRight 0.3s ease;
  `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initCart();
});
