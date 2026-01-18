const LogOutButton = document.getElementById("logout-tab");

const SuccessLogout = document.getElementById("success-logout");
const DiscardLogout = document.getElementById("discard-logout");

LogOutButton.addEventListener("click", () => {
    document.getElementById("log_out").showModal();
});

SuccessLogout.addEventListener("click", () => {
    location.href = "../../index.html";
});

DiscardLogout.addEventListener("click", () => {
    document.getElementById("log_out").close();
});

const productSelect = document.getElementById("productSelect");
const qtyInput = document.getElementById("productQty");
const cartBody = document.getElementById("cartBody");
const orderTotalEl = document.getElementById("orderTotal");
const customer_Phone = document.getElementById("customerPhone")
const customerName = document.getElementById("customerName")


let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = [];

/* ---------------- LOAD PRODUCTS ---------------- */

const loadProducts = () => {
    productSelect.innerHTML = `<option value="">Select Product</option>`;
    products.forEach(p => {
        if (p.stock > 0) {
            productSelect.innerHTML += `
                <option value="${p.id}">
                    ${p.name} (Stock: ${p.stock})
                </option>
            `;
        }
    });
}
loadProducts();

const validateAndAddToCart = () => {
    const productId = productSelect.value;
    const customerPhoneNumber = customer_Phone.value
    const customer_Name = customerName.value.trim()
    const qty = Number(qtyInput.value);

    if (!productId || qty <= 0 || customerPhoneNumber.length < 10 || customerName.length < 3) return Snackbar.show({ text: "Invalid Input", showAction: false, pos: 'bottom-right', backgroundColor: 'red' })

    const product = products.find(p => p.id === productId);
    if (!product) return;

    if (qty > product.stock) {
        return Snackbar.show({ text: "Over Quantity", showAction: false, pos: 'bottom-right', backgroundColor: 'red' })
    }

    const existing = cart.find(i => i.id === productId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty
        });
    }

    renderCart();
}

document.getElementById("addToCart").addEventListener("click", validateAndAddToCart);

/* ---------------- RENDER CART ---------------- */

const renderCart = () => {
    cartBody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const rowTotal = item.qty * item.price;
        total += rowTotal;

        cartBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td>₹${rowTotal}</td>
                <td>
                    <button onclick="removeItem('${item.id}')"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });

    orderTotalEl.innerText = total;
}


const removeItem = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}


document.getElementById("checkoutOrder").addEventListener("click", () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();

    if (!name || !phone || cart.length === 0) {
        return alert("Complete all details");
    }

    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        product.stock -= item.qty;
    });

    localStorage.setItem("products", JSON.stringify(products));

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
        orderId: Date.now(),
        customer: { name, phone },
        items: cart,
        total: orderTotalEl.innerText,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    Snackbar.show({ text: "Order Placed", showAction: false, pos: 'bottom-right', backgroundColor: 'darkgreen' })
    generateSimpleReceipt(name, cart)

    cart = [];
    renderCart();
    loadProducts();
    renderRecentOrders();
});



const generateSimpleReceipt = (customerName, cartItems) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let totalAmount = 0;

    doc.setFontSize(16);
    doc.text("Product Receipt", 14, 15);

    doc.setFontSize(11);
    doc.text(`Customer Name: ${customerName}`, 14, 25);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 32);

    cartItems.forEach(item => {
        totalAmount += item.price * item.qty;
    });

    doc.autoTable({
        startY: 40,
        head: [["Product", "Qty", "Price", "Total"]],
        body: cartItems.map(item => [
            item.name,
            item.qty,
            `₹${item.price}`,
            `₹${item.price * item.qty}`
        ])
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(13);
    doc.text(`Grand Total: ₹ ${totalAmount}`, 14, finalY);

    doc.setFontSize(10);
    doc.text("Thank you for your purchase!", 14, finalY + 10);

    doc.save(`Receipt_${Date.now()}.pdf`);
}

/* --------------------------- Render Recent Order -------------------------- */

const renderRecentOrders = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const tableBody = document.getElementById("ordersTableBody");

    tableBody.innerHTML = "";

    orders.slice().reverse().forEach(order => {
        tableBody.innerHTML += `
            <tr>
                <td>#${order.orderId}</td>
                <td>${order.customer.name}</td>
                <td>${order.customer.phone}</td>
                <td>${order.items.length}</td>
                <td>₹${order.total}</td>
                <td>${order.date}</td>
                <td>
                    <button class="view-btn" onclick="viewOrder('${order.orderId}')">
                        View
                    </button>
                </td>
            </tr>
        `;
    });
}

window.addEventListener("load", renderRecentOrders())

const viewOrder = (orderId) => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const order = orders.find(o => o.orderId == orderId);
    if (!order) return;

    document.getElementById("odOrderId").innerText = order.orderId;
    document.getElementById("odCustomer").innerText = order.customer.name;
    document.getElementById("odPhone").innerText = order.customer.phone;
    document.getElementById("odDate").innerText = order.date;
    document.getElementById("odTotal").innerText = order.total;

    const itemsBody = document.getElementById("odItems");
    itemsBody.innerHTML = "";

    order.items.forEach(item => {
        itemsBody.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.qty}</td>
                <td>₹${item.price}</td>
                <td>₹${item.qty * item.price}</td>
            </tr>
        `;
    });

    document.getElementById("orderDetailsDialog").showModal();
}

function closeOrderDialog() {
    document.getElementById("orderDetailsDialog").close();
}

