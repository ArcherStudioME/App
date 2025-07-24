const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

// 1. Close navbar on link or dropdown-item click (except dropdown toggle)
document.querySelectorAll('.navbar-collapse .nav-link, .navbar-collapse .dropdown-item').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.classList.contains('dropdown-toggle')) return;

    if (window.getComputedStyle(navbarToggler).display !== 'none') {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});

// 2. Close navbar when clicking outside
document.addEventListener('click', (e) => {
  const isNavbarOpen = navbarCollapse.classList.contains('show');
  const clickedInside = navbarCollapse.contains(e.target) || navbarToggler.contains(e.target);

  if (isNavbarOpen && !clickedInside) {
    new bootstrap.Collapse(navbarCollapse).hide();
  }
});

// 3. Close navbar if user clicks into an iframe
window.addEventListener('blur', () => {
  setTimeout(() => {
    const activeElement = document.activeElement;
    const isNavbarOpen = navbarCollapse.classList.contains('show');

    if (activeElement && activeElement.tagName === 'IFRAME' && isNavbarOpen) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  }, 0);
});

// Ripple effect
document.querySelectorAll('.ripple-container').forEach(container => {
  container.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    container.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Handle bottom nav and order layout based on keyboard visibility
const bottomNav = document.querySelector('.mobile-bottom-nav');
const orderContainer = document.getElementById('orderContainer');
const orderFrame = document.getElementById('orderFrame');
const threshold = 150;

if (window.visualViewport && (orderContainer || orderFrame || bottomNav)) {
  const initialHeight = window.visualViewport.height;

  window.visualViewport.addEventListener('resize', () => {
    const currentHeight = window.visualViewport.height;
    const heightDiff = initialHeight - currentHeight;
    const keyboardOpen = heightDiff > threshold;

    if (bottomNav) {
      bottomNav.classList.toggle('hide-bottom-nav', keyboardOpen);
    }

    if (orderContainer) {
      orderContainer.classList.toggle('order-full', keyboardOpen);
      orderContainer.classList.toggle('order-adjusted', !keyboardOpen);
    }

    if (orderFrame) {
      orderFrame.classList.toggle('order-full', keyboardOpen);
      orderFrame.classList.toggle('order-adjusted', !keyboardOpen);
    }
  });
}
