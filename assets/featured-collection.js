(function () {
  // Desktop scroll function
  window.scrollProducts = function (buttonEl) {
    if (!buttonEl) return;
    var sectionEl = buttonEl.closest('section');
    if (!sectionEl) return;
    var sectionId = sectionEl.id.replace('featured-hero-', '');
    var scrollContainerId = 'products-scroll-container-' + sectionId;
    var container = sectionEl.querySelector('#' + scrollContainerId);
    if (!container) return;

    var direction = buttonEl.dataset.direction || 'right';
    var scrollAmount = direction === 'left' ? -230 : 230;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Mobile/Tablet scroll function
  window.scrollProductsMobile = function (buttonEl) {
    if (!buttonEl) return;
    var sectionEl = buttonEl.closest('section');
    if (!sectionEl) return;
    var container = sectionEl.querySelector('.mobile-hero-section .products-scroll');
    if (!container) return;

    var direction = buttonEl.dataset.direction || 'right';
    var scrollAmount = direction === 'left' ? -160 : 160;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Initialize on DOM ready or immediately if already loaded
  function init() {
    var sections = document.querySelectorAll('[id^="featured-hero-"]');
    sections.forEach(function (sectionEl) {
      var sectionId = sectionEl.id.replace('featured-hero-', '');
      var scrollContainerId = 'products-scroll-container-' + sectionId;

      initializeDesktopScroll(sectionEl, scrollContainerId);
      initializeMobileTabletScroll(sectionEl);
      initializeVariantInteractions(sectionEl);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function initializeDesktopScroll(sectionEl, scrollContainerId) {
    var container = sectionEl.querySelector('#' + scrollContainerId);
    var scrollButtonLeft = sectionEl.querySelector('.scroll-button-desktop.scroll-button-left');
    var scrollButtonRight = sectionEl.querySelector('.scroll-button-desktop.scroll-button-right');
    if (!container || !scrollButtonLeft || !scrollButtonRight) return;

    function checkScrollNeeded() {
      var screenWidth = window.innerWidth;

      if (screenWidth >= 1600) {
        container.style.width = '754px';
        container.style.overflowX = 'visible';
        scrollButtonLeft.style.display = 'none';
        scrollButtonRight.style.display = 'none';
      } else {
        container.style.width = '720px';
        container.style.overflowX = 'auto';
        checkScrollButtons();
      }
    }

    function checkScrollButtons() {
      var canScrollLeft = container.scrollLeft > 5;
      scrollButtonLeft.style.display = canScrollLeft ? 'block' : 'none';

      var canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth - 5;
      scrollButtonRight.style.display = canScrollRight ? 'block' : 'none';
    }

    checkScrollNeeded();
    checkScrollButtons();

    container.addEventListener('scroll', checkScrollButtons);

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        checkScrollNeeded();
        checkScrollButtons();
      }, 100);
    });
  }

  function initializeMobileTabletScroll(sectionEl) {
    var container = sectionEl.querySelector('.mobile-hero-section .products-scroll');
    var scrollButtonLeft = sectionEl.querySelector('.scroll-button-mobile-tablet.scroll-button-left');
    var scrollButtonRight = sectionEl.querySelector('.scroll-button-mobile-tablet.scroll-button-right');
    if (!container || !scrollButtonLeft || !scrollButtonRight) return;

    function checkMobileTabletScrollButtons() {
      var canScrollLeft = container.scrollLeft > 5;
      var canScrollRight = container.scrollLeft + container.clientWidth < container.scrollWidth - 5;

      scrollButtonLeft.style.display = canScrollLeft ? 'block' : 'none';
      scrollButtonRight.style.display = canScrollRight ? 'block' : 'none';
    }

    checkMobileTabletScrollButtons();

    container.addEventListener('scroll', checkMobileTabletScrollButtons);

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobileTabletScrollButtons, 100);
    });
  }

  function initializeVariantInteractions(sectionEl) {
    var moneyFormat = sectionEl.dataset.moneyFormat || '';
    var productCards = sectionEl.querySelectorAll('[data-product-card]');
    if (!productCards.length) return;

    productCards.forEach(function (card) {
      var productJson = card.dataset.productJson;
      if (!productJson) return;

      var productData;
      try {
        productData = JSON.parse(productJson);
      } catch (error) {
        console.error('Failed to parse product JSON', error);
        return;
      }

      if (!productData.variants || !productData.variants.length) return;

      var pills = card.querySelectorAll('[data-variant-id]');
      var priceEl = card.querySelector('[data-product-price]');
      var imageEl = card.querySelector('[data-product-image]');
      var linkEl = card.querySelector('[data-product-link]');

      var activeVariant =
        productData.variants.find(function (variant) {
          return String(variant.id) === card.dataset.initialVariantId;
        }) || productData.variants[0];

      updateCard(activeVariant);

      pills.forEach(function (pill) {
        pill.addEventListener('click', function () {
          if (pill.classList.contains('border-black')) return;
          var variantId = pill.dataset.variantId;
          var variant = productData.variants.find(function (item) {
            return String(item.id) === variantId;
          });
          if (!variant) return;

          updateCard(variant);
          pills.forEach(function (btn) {
            var isSelected = btn === pill;
            btn.classList.toggle('border-black', isSelected);
            btn.classList.toggle('border-gray-300', !isSelected);
            if (isSelected) {
              btn.style.boxShadow = 'inset 0 0 0 1px #FFFFFF';
            } else {
              btn.style.boxShadow = '';
            }
          });
        });
      });

      function updateCard(variant) {
        if (priceEl) {
          var currencySymbol = priceEl.dataset.currencySymbol;
          if (currencySymbol) {
            var amountNumber = (variant.price / 100).toFixed(2);
            priceEl.textContent = currencySymbol + amountNumber;
          } else if (typeof Shopify !== 'undefined' && typeof Shopify.formatMoney === 'function') {
            priceEl.textContent = Shopify.formatMoney(variant.price, moneyFormat);
          } else {
            priceEl.textContent = (variant.price / 100).toFixed(2);
          }
        }

        if (linkEl) {
          linkEl.href = productData.url + '?variant=' + variant.id;
        }

        if (imageEl) {
          var variantImage =
            variant.image || (variant.featured_image && (variant.featured_image.url || variant.featured_image.src));
          var fallbackImage = productData.featured_image;
          var imageUrl = variantImage || fallbackImage;
          if (imageUrl) {
            imageEl.src = imageUrl;
          }
          if (variant.title) {
            imageEl.alt = variant.title;
          }
        }
      }
    });
  }
})();

