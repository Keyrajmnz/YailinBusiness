const cartItemsBox =
    document.querySelector(".cart-items");

const cartTotal =
    document.querySelector(".cart-total");

const placeOrderButton =
    document.querySelector(".place-order");

const orderSummary =
    document.querySelector(".order-summary");

const formMessage =
    document.querySelector(".form-message");

const customerName =
    document.querySelector("#customer-name");

const contactMethod =
    document.querySelector("#contact-method");

const contactField =
    document.querySelector("#contact-field");

const contactLabel =
    document.querySelector("#contact-label");

const contactPrefix =
    document.querySelector("#contact-prefix");

const customerContact =
    document.querySelector("#customer-contact");

const paymentMethod =
    document.querySelector("#payment-method");

const specialInstructions =
    document.querySelector("#special-instructions");

const cartItems =
    JSON.parse(localStorage.getItem("cartItems")) || [];

showOrder();

contactMethod.addEventListener("change", function() {
    customerContact.value = "";

    if (contactMethod.value === "Instagram") {
        contactField.hidden = false;

        contactLabel.textContent =
            "Instagram";

        contactPrefix.textContent =
            "@";

        customerContact.placeholder =
            "username";

        customerContact.inputMode =
            "text";
    } else if (contactMethod.value === "Phone") {
        contactField.hidden = false;

        contactLabel.textContent =
            "Phone Number";

        contactPrefix.textContent =
            "";

        customerContact.placeholder =
            "___-___-____";

        customerContact.inputMode =
            "numeric";
    } else {
        contactField.hidden = true;
    }
});

customerContact.addEventListener("input", function() {
    if (contactMethod.value === "Instagram") {
        if (customerContact.value.startsWith("@")) {
            customerContact.value =
                customerContact.value.slice(1);
        }
    }

    if (contactMethod.value === "Phone") {
        let numbers =
            customerContact.value.replace(/\D/g, "");

        numbers =
            numbers.slice(0, 10);

        if (numbers.length > 6) {
            customerContact.value =
                numbers.slice(0, 3) +
                "-" +
                numbers.slice(3, 6) +
                "-" +
                numbers.slice(6);
        } else if (numbers.length > 3) {
            customerContact.value =
                numbers.slice(0, 3) +
                "-" +
                numbers.slice(3);
        } else {
            customerContact.value =
                numbers;
        }
    }
});

placeOrderButton.addEventListener("click", function() {
    const name =
        customerName.value.trim();

    const method =
        contactMethod.value;

    const contact =
        customerContact.value.trim();

    const payment =
        paymentMethod.value;

    const instructions =
        specialInstructions.value.trim();

    if (cartItems.length === 0) {
        formMessage.textContent =
            "Your cart is empty.";

        return;
    }

    if (name === "") {
        formMessage.textContent =
            "Please enter your name.";

        return;
    }

    if (method === "") {
        formMessage.textContent =
            "Please choose a contact method.";

        return;
    }

    if (contact === "") {
        formMessage.textContent =
            "Please enter your contact information.";

        return;
    }

    if (method === "Phone") {
        const phoneNumbers =
            contact.replace(/\D/g, "");

        if (phoneNumbers.length !== 10) {
            formMessage.textContent =
                "Please enter a 10-digit phone number.";

            return;
        }
    }

    if (payment === "") {
        formMessage.textContent =
            "Please choose a payment method.";

        return;
    }

    let finalContact = contact;

    if (method === "Instagram") {
        finalContact =
            "@" + contact;
    }

    let summary =
        "Order for YAILIN'S MUNCHIES\n\n" +
        "Name: " +
        name +
        "\n" +
        "Contact Method: " +
        method +
        "\n" +
        "Contact: " +
        finalContact +
        "\n" +
        "Payment: " +
        payment +
        "\n\n";

    let totalPrice = 0;

    cartItems.forEach(function(item) {
        const itemTotal =
            item.price * item.quantity;

        summary =
            summary +
            item.name +
            "\n";

        if (item.details !== "") {
            summary =
                summary +
                item.details +
                "\n";
        }

        summary =
            summary +
            "Quantity: " +
            item.quantity +
            "\n$" +
            itemTotal +
            "\n\n";

        totalPrice =
            totalPrice + itemTotal;
    });

    summary =
        summary +
        "Total: $" +
        totalPrice +
        "\n\n";

    if (instructions === "") {
        summary =
            summary +
            "Special instructions: None";
    } else {
        summary =
            summary +
            "Special instructions: " +
            instructions;
    }

    orderSummary.textContent =
        summary;

    orderSummary.classList.add("open");

    formMessage.textContent =
        "Order summary ready. It has not been sent yet.";
});

function showOrder() {
    cartItemsBox.textContent = "";

    if (cartItems.length === 0) {
        cartItemsBox.textContent =
            "Your cart is empty.";

        cartTotal.textContent =
            "Total: $0";

        return;
    }

    let totalPrice = 0;

    cartItems.forEach(function(item) {
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
                " · Qty: " +
                item.quantity +
                " · $" +
                itemTotal;
        } else {
            itemDetails.textContent =
                "Qty: " +
                item.quantity +
                " · $" +
                itemTotal;
        }

        itemBox.appendChild(itemName);
        itemBox.appendChild(itemDetails);

        cartItemsBox.appendChild(itemBox);

        totalPrice =
            totalPrice + itemTotal;
    });

    cartTotal.textContent =
        "Total: $" + totalPrice;
}
