# Yailin's Munchies — Website Source Code

A small vanilla HTML/CSS/JavaScript website for a chamoy candy and snack business.
No frameworks, no build step, no dependencies to install.

## How to open it locally

Option 1 — quickest: double-click `index.html`. It opens in your browser and everything works.

Option 2 — recommended (so the cart and pages behave exactly like the live site): serve the folder with any tiny static server, for example:

    python3 -m http.server 8080

then open http://localhost:8080 in your browser.

## Files in this ZIP

Upload ALL of these to your GitHub repository (Keyrajmnz/YailinBusiness), keeping this exact structure:

    index.html        Home (animated hero, marquee, featured products)
    shop.html         Menu with sizes, quantities, kits, cart
    faq.html          Questions & answers
    contact.html      Contact page
    order.html        Checkout: order summary + details form
    style.css         All styles for every page
    script.js         Shop + cart logic (loads on shop.html only)
    order.js          Checkout logic (loads on order.html only)
    site.js           Shared UI: menu helpers, scroll reveals, footer year, cart count
    favicon.svg       Site icon
    fonts/
      Super Adorable.ttf   Brand font
    images/
      chamoo.jpeg          Hero candy photo

These replace the old files of the same name in the repository (index.html, shop.html,
faq.html, contact.html, order.html, style.css, script.js, order.js). The new files
site.js and favicon.svg are additions. Everything else in the repo can stay as is.

## Notes

- The cart is saved in the visitor's browser (localStorage key "cartItems").
- Checkout creates an order summary on the page for the customer to review.
  Nothing is sent anywhere yet — that step is still to come.
- Product photos are placeholders. To use a real photo, open shop.html, find the
  product, and replace its `<div class="product-image ph ...">...</div>` with
  `<div class="product-image"><img src="images/your-photo.jpg" alt="Product name"></div>`.
  Each placeholder has an HTML comment above it showing exactly what to do.

## Copy correction in this reviewed ZIP

The Contact, FAQ, and Checkout pages now state that no contact or order delivery channel is live yet. This avoids directing customers to the special-instructions field when it cannot send anything.
