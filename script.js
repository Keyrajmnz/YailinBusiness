const shopButton = document.querySelector(".shop-button");

if (shopButton) {
    shopButton.addEventListener("click", (event) => {
        event.preventDefault();

        const destination = shopButton.href;

        shopButton.classList.add("is-filling");

        setTimeout(() => {
            shopButton.classList.add("is-popping");
        }, 650);

        setTimeout(() => {
            window.location.href = destination;
        }, 900);
    });
}

const photoStrip = document.querySelector(".photo-strip");
const photoTrack = document.querySelector(".photo-track");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (photoStrip && photoTrack && !reducedMotion.matches) {
    const speed = 40;
    let offset = 0;
    let previousTime = performance.now();

    while (photoTrack.scrollWidth < photoStrip.clientWidth + 400) {
        const clone = photoTrack.firstElementChild.cloneNode(true);
        clone.alt = "";
        clone.setAttribute("aria-hidden", "true");
        photoTrack.appendChild(clone);
    }

    function movePhotos(currentTime) {
        const elapsed = Math.min((currentTime - previousTime) / 1000, 0.05);
        previousTime = currentTime;

        offset -= speed * elapsed;

        const firstPhoto = photoTrack.firstElementChild;
        const photoWidth = firstPhoto.getBoundingClientRect().width;

        if (-offset >= photoWidth) {
            offset += photoWidth;
            photoTrack.appendChild(firstPhoto);
        }

        photoTrack.style.transform = `translate3d(${offset}px, 0, 0)`;

        requestAnimationFrame(movePhotos);
    }

    requestAnimationFrame(movePhotos);
}