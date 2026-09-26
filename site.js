// Shared UI: footer year, cart count on non-shop pages, scroll reveals, hero parallax, Esc to close panels.

document.querySelectorAll(".footer-year").forEach(function(el) {
    el.textContent = new Date().getFullYear();
});

const countEl = document.querySelector(".cart-count");

if (countEl && !document.querySelector(".cart-panel")) {
    const savedItems =
        JSON.parse(localStorage.getItem("cartItems")) || [];

    let savedTotal = 0;

    savedItems.forEach(function(item) {
        savedTotal = savedTotal + item.quantity;
    });

    countEl.textContent = savedTotal;
}

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(function(el) {
        revealObserver.observe(el);
    });
} else {
    document.querySelectorAll(".reveal").forEach(function(el) {
        el.classList.add("in-view");
    });
}

const heroPhoto = document.querySelector(".hero-photo");

if (heroPhoto) {
    let parallaxTicking = false;

    window.addEventListener("scroll", function() {
        if (!parallaxTicking) {
            window.requestAnimationFrame(function() {
                const offset = Math.min(window.scrollY * 0.08, 60);
                heroPhoto.style.setProperty("--py", offset + "px");
                parallaxTicking = false;
            });

            parallaxTicking = true;
        }
    }, { passive: true });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        const menu = document.querySelector(".site-menu");
        const cart = document.querySelector(".cart-panel");

        if (menu) {
            menu.classList.remove("open");
        }

        if (cart) {
            cart.classList.remove("open");
        }
    }
});
