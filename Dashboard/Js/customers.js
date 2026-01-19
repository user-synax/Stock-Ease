const customersBody = document.getElementById("customersBody");

/* ---------------- LOAD CUSTOMERS ---------------- */

function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const orderedCustomers = JSON.parse(localStorage.getItem("orders")) || [];
    customersBody.innerHTML = "";

    customers.forEach(c => {
        customersBody.innerHTML += `
            <tr>
                <td>${c.name}</td>
                <td>${c.phone} || "NA"</td>
                <td>${c.email || "NA"}</td>
                <td>${c.address || "NA"}</td>
                <td>
                    <button onclick="deleteCustomer('${c.id}')"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });

    orderedCustomers.forEach(c => {
        customersBody.innerHTML += `
            <tr>
                <td>${c.customer.name}</td>
                <td>${c.customer.phone}</td>
                <td>${c.email || "NA"}</td>
                <td>${c.address || "NA"}</td>
                <td>
                    <button onclick="deleteCustomer('${c.id}')"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });
}

loadCustomers();

/* ---------------- MODAL ---------------- */

function openCustomerModal() {
    document.getElementById("customerModal").showModal();
}

function closeCustomerModal() {
    document.getElementById("customerModal").close();
}

/* ---------------- SAVE CUSTOMER ---------------- */

function saveCustomer() {
    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const email = document.getElementById("custEmail").value.trim();
    const address = document.getElementById("custAddress").value.trim();

    if (!name || !phone) {
        Snackbar.show({
            text: "Name & Phone are required",
            showAction: false,
            pos: "bottom-right",
            backgroundColor: "red"
        });
        return;
    }

    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    customers.push({
        id: "CUST-" + Date.now(),
        name,
        phone,
        email,
        address,
        createdAt: new Date().toLocaleDateString()
    });

    localStorage.setItem("customers", JSON.stringify(customers));

    Snackbar.show({
        text: "Customer Added",
        showAction: false,
        pos: "bottom-right",
        backgroundColor: "green"
    });

    closeCustomerModal();
    loadCustomers();

    // reset
    custName.value = custPhone.value = custEmail.value = custAddress.value = "";
}

/* ---------------- DELETE CUSTOMER ---------------- */

function deleteCustomer(id) {
    if (!confirm("Delete this customer?")) return;

    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    customers = customers.filter(c => c.id !== id);

    localStorage.setItem("customers", JSON.stringify(customers));
    loadCustomers();

    Snackbar.show({
        text: "Customer Removed",
        showAction: false,
        pos: "bottom-right",
        backgroundColor: "#ef4444"
    });
}
