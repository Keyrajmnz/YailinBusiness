const productCards = document.querySelectorAll(".product-card");

const cartButton = document.querySelector(".cart-button");
const closeCartButton = document.querySelector(".close-cart");

const cartCount = document.querySelector(".cart-count");
const cartPanel = document.querySelector(".cart-panel");
const cartItemsBox = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");

const shopMessage = document.querySelector(".shop-message");

const continueOrderButton =
    document.querySelector(".continue-order");

let cartItems =
    JSON.parse(localStorage.getItem("cartItems")) || [];

let totalItems = 0;

cartItems.forEach(function(item) {
    totalItems =
        totalItems + item.quantity;
});

cartCount.textContent =
    totalItems;

productCards.forEach(function(card) {
    const addButton =
        card.querySelector(".add-to-cart");

    addButton.addEventListener("click", function() {
        const productName =
            card.querySelector("h2").textContent;

        const quantityInput =
            card.querySelector('input[type="number"]');

        const quantity =
            Number(quantityInput.value);

        const sizeOptions =
            card.querySelectorAll('input[type="radio"]');

        const selectedSize =
            card.querySelector('input[type="radio"]:checked');

        const kitSide =
            card.querySelector(".kit-side");

        const kitDrink =
            card.querySelector(".kit-drink");

        if (quantity < 1) {
            shopMessage.textContent =
                "Quantity must be at least 1.";

            return;
        }

        let price = 0;
        let details = "";

        if (kitSide && kitDrink) {
            if (kitSide.value === "") {
                shopMessage.textContent =
                    "Please choose a kit option.";

                return;
            }

            if (kitDrink.value === "") {
                shopMessage.textContent =
                    "Please choose a drink.";

                return;
            }

            price = Number(card.dataset.price);

            details =
                kitSide.value +
                " + " +
                kitDrink.value;
        } else if (sizeOptions.length > 0) {
            if (!selectedSize) {
                shopMessage.textContent =
                    "Please choose a size first.";

                return;
            }

            details =
                selectedSize.value;

            if (details === "4 oz") {
                price = 4;
            } else {
                price = 2;
            }
        } else {
            price =
                Number(card.dataset.price);
        }

        let matchingItem = null;

        cartItems.forEach(function(cartItem) {
            if (
                cartItem.name === productName &&
                cartItem.details === details &&
                cartItem.price === price
            ) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity =
                matchingItem.quantity + quantity;
        } else {
            const item = {
                name: productName,
                details: details,
                quantity: quantity,
                price: price
            };

            cartItems.push(item);
        }

        totalItems =
            totalItems + quantity;

        cartCount.textContent =
            totalItems;

        saveCart();

        shopMessage.textContent =
            "Added " +
            quantity +
            " " +
            productName +
            " to your cart.";

        showCart();
    });
});

cartButton.addEventListener("click", function() {
    cartPanel.classList.toggle("open");

    showCart();
});

closeCartButton.addEventListener("click", function() {
    cartPanel.classList.remove("open");
});

continueOrderButton.addEventListener("click", function() {
    if (cartItems.length === 0) {
        shopMessage.textContent =
            "Add something to your cart first.";

        return;
    }

    window.location.href =
        "order.html";
});

function saveCart() {
    localStorage.setItem(
        "cartItems",
        JSON.stringify(cartItems)
    );
}

function showCart() {
    cartItemsBox.textContent = "";

    if (cartItems.length === 0) {
        cartItemsBox.textContent =
            "Your cart is empty.";

        cartTotal.textContent =
            "Total: $0";

        return;
    }

    let totalPrice = 0;

    cartItems.forEach(function(item, index) {
        const itemTotal =
            item.price * item.quantity;

        const itemBox =
            document.createElement("div");

        itemBox.className =
            "cart-item";

        const itemName =
            document.createElement("p");

        itemName.textContent =
            item.name;

        const itemDetails =
            document.createElement("p");

        if (item.details !== "") {
            itemDetails.textContent =
                item.details +
                " · Quantity: " +
                item.quantity +
                " · $" +
                itemTotal;
        } else {
            itemDetails.textContent =
                "Quantity: " +
                item.quantity +
                " · $" +
                itemTotal;
        }

        const removeButton =
            document.createElement("button");

        removeButton.className =
            "remove-item";

        removeButton.textContent =
            "Remove";

        removeButton.addEventListener("click", function() {
            totalItems =
                totalItems -
                item.quantity;

            cartCount.textContent =
                totalItems;

            cartItems.splice(index, 1);

            saveCart();
            showCart();
        });

        itemBox.appendChild(itemName);
        itemBox.appendChild(itemDetails);
        itemBox.appendChild(removeButton);

        cartItemsBox.appendChild(itemBox);

        totalPrice =
            totalPrice + itemTotal;
    });

    cartTotal.textContent =
        "Total: $" + totalPrice;
}