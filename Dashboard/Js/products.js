const LogOutButton = document.getElementById("logout-tab");

const SuccessLogout = document.getElementById("success-logout");
const DiscardLogout = document.getElementById("discard-logout");

const GetSearchProductInput = document.getElementById("searchProduct");

const UpdateProduct = document.getElementById("update_product");
const closeAddProductIcon = document.getElementById("closeAddProduct");

const updateProductButton = document.getElementById("_add_product_button_")

LogOutButton.addEventListener("click", () => {
    document.getElementById("log_out").showModal();
});

SuccessLogout.addEventListener("click", () => {
    location.href = "../../index.html";
});

DiscardLogout.addEventListener("click", () => {
    document.getElementById("log_out").close();
});


/* -------------------------------------------------------------------------- */
/*                               OnLoad Function                              */
/* -------------------------------------------------------------------------- */

const Reload = () => {
    RenderProductsList();
};

window.addEventListener("load", () => {
    Reload();
});

/* ----------------------- Adding New Products On List ---------------------- */

const RenderProductsList = () => {
    const tableBody = document.querySelector(".stock-table tbody");
    const ListStatus = document.getElementById("list-status");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const getStockStatus = (stock) => {
        if (stock > 10) {
            return { text: "In Stock", class: "in-stock" };
        } else if (stock > 0) {
            return { text: "Stock Soon", class: "low-stock" };
        } else {
            return { text: "Out of Stock", class: "out-stock" };
        }
    };
    // ListStatus.style.display = "none";
    tableBody.innerHTML = products
        .map((product) => {
            ListStatus.style.display = "none";
            const status = getStockStatus(product.stock);
            let margin = product.price - product.buyPrice;
            return `
            <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.addedAt}</td>
            <td>₹ ${Math.floor(margin)}</td>
            <td>
            <span class="status ${status.class}">
                ${status.text}
            </span>
            </td>
            <td>
            <button class="edit-product-btn" data-id="${product.id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-product-btn" data-id="${product.id}"><i class="fa-regular fa-trash-can"></i></button>
            </td>
            </tr>
        `;
        })
        .join("");
};

/* ----------------------------- Search Product ----------------------------- */

const SearchProduct = (searchValue) => {
    const tableBody = document.querySelector(".stock-table tbody");
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const value = searchValue.toLowerCase();
    const result = products.filter((product) => {
        return (
            product.id.toString().includes(value) ||
            product.name.toLowerCase().includes(value) ||
            product.category.toLowerCase().includes(value)
        );
    });

    const getStockStatus = (stock) => {
        if (stock > 20) {
            return { text: "In Stock", class: "in-stock" };
        } else if (stock > 0) {
            return { text: "Stock Soon", class: "low-stock" };
        } else {
            return { text: "Out of Stock", class: "out-stock" };
        }
    };
    tableBody.innerHTML = result
        .map((product) => {
            const status = getStockStatus(product.stock);
            let margin = product.price - product.buyPrice;
            return `
            <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.addedAt}</td>
            <td>₹ ${Math.floor(margin)}</td>
            <td>
            <span class="status ${status.class}">
                ${status.text}
            </span>
            </td>
            <td>
            <button class="edit-product-btn" data-id="${product.id}"><i class="fa-regular fa-pen-to-square"></i></button>
            <button class="delete-product-btn" data-id="${product.id}"><i class="fa-regular fa-trash-can"></i></button>
            </td>
            </tr>
        `;
        })
        .join("");
};
GetSearchProductInput.addEventListener("input", (e) => {
    SearchProduct(e.target.value);
});


/* ----------------------------- Update Product ----------------------------- */

let editingProductId = null;

document.querySelector(".stock-table tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-product-btn")) {
        const productId = e.target.dataset.id;
        const products = JSON.parse(localStorage.getItem("products")) || [];

        const product = products.find(p => p.id === productId);
        if (!product) return;

        editingProductId = productId;

        document.getElementById("product-name").value = product.name;
        document.getElementById("product-category").value = product.category;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-stock").value = product.stock;
        document.getElementById("product-desc").value = product.description;
        document.getElementById("product-buy-price").value = product.buyPrice;

        document.getElementById("add_product").show();
    }
});

closeAddProductIcon.addEventListener("click", () => {
    document.getElementById("add_product").close();
})

const updateProduct = () => {
    const SuccessColor = "#10b981";
    if (!editingProductId) return;

    const Getname = document.getElementById("product-name");
    const Getcategory = document.getElementById("product-category");
    const GetBuyPrice = document.getElementById("product-buy-price");
    const Getprice = document.getElementById("product-price");
    const Getstock = document.getElementById("product-stock");
    const Getdescription = document.getElementById("product-desc");

    const name = Getname.value.trim();
    const category = Getcategory.value.trim();
    const price = Getprice.value.trim();
    const stock = Getstock.value.trim();
    const description = Getdescription.value.trim();
    const buyPrice = GetBuyPrice.value.trim();

    let products = JSON.parse(localStorage.getItem("products")) || [];

    products = products.map((product) => {
        if (product.id === editingProductId) {
            return {
                ...product,
                name,
                category,
                price,
                stock,
                description,
                buyPrice,
            };
        }
        return product;
    });

    localStorage.setItem("products", JSON.stringify(products));

    editingProductId = null;

    Snackbar.show({
        text: "Product Updated Successfully",
        showAction: false,
        pos: "bottom-right",
        backgroundColor: `${SuccessColor}`,
    });

    document.getElementById("add_product").close();
    Reload()
};

updateProductButton.addEventListener("click", updateProduct)

/* ----------------------------- Delete Product ----------------------------- */

document.querySelector(".stock-table tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-product-btn")) {
        const productId = e.target.dataset.id;

        // Optional confirmation
        if (!confirm("Are you sure you want to delete this product?")) return;

        let products = JSON.parse(localStorage.getItem("products")) || [];

        products = products.filter(product => product.id !== productId);

        localStorage.setItem("products", JSON.stringify(products));

        Snackbar.show({
            text: "Product Deleted",
            showAction: false,
            pos: "bottom-right",
            backgroundColor: "#ef4444",
        });

        RenderProductsList();
        let sound = new Audio()
        sound.src = "../../Assets/Sound/delete.mp3"
        sound.play()
    }
});


/* ----------------------------- Filter Products ---------------------------- */

const statusFilter = document.getElementById("statusFilter");

statusFilter.addEventListener("change", () => {
    filterProductsByStatus(statusFilter.value);
});

// const filterProductsByStatus = (selectedStatus) => {
//     const tableBody = document.querySelector(".stock-table tbody");
//     const products = JSON.parse(localStorage.getItem("products")) || [];

//     const getStockStatus = (stock) => {
//         if (stock > 20) {
//             return { text: "In Stock", class: "in-stock" };
//         } else if (stock > 0) {
//             return { text: "Stock Soon", class: "low-stock" };
//         } else {
//             return { text: "Out of Stock", class: "out-stock" };
//         }
//     };

//     let filteredProducts = products;

//     if (selectedStatus !== "all") {
//         filteredProducts = products.filter(product => {
//             return getStockStatus(product.stock) === selectedStatus;
//         });
//     }

//     tableBody.innerHTML = filteredProducts.map(product => {
//         const statusClass = getStockStatus(product.stock);
//         const statusText =
//             statusClass === "in-stock" ? "In Stock" :
//                 statusClass === "stock-stock" ? "Stock Soon" :
//                     "Out of Stock";

//         let margin = product.price - product.buyPrice;

//         return `
//         <tr>
//             <td>${product.id}</td>
//             <td>${product.name}</td>
//             <td>${product.category}</td>
//             <td>${product.stock}</td>
//             <td>${product.addedAt}</td>
//             <td>₹ ${Math.floor(margin)}</td>
//             <td>
//                 <span class="status ${statusClass}">
//                     ${statusText}
//                 </span>
//             </td>
//             <td>
//                 <button class="edit-product-btn" data-id="${product.id}">
//                     <i class="fa-regular fa-pen-to-square"></i>
//                 </button>
//                 <button class="delete-product-btn" data-id="${product.id}">
//                     <i class="fa-regular fa-trash-can"></i>
//                 </button>
//             </td>
//         </tr>
//         `;
//     }).join("");
// };


const filterProductsByStatus = (selectedStatus) => {
    const tableBody = document.querySelector(".stock-table tbody");
    const products = JSON.parse(localStorage.getItem("products")) || [];

    let filteredProducts = products;

    const getStockStatus = (stock) => {
        if (stock > 10) {
            return { text: "In Stock", class: "in-stock" };
        } else if (stock > 0) {
            return { text: "Stock Soon", class: "stock-soon" };
        } else {
            return { text: "Out of Stock", class: "out-of-stock" };
        }
    };

    if (selectedStatus !== "all") {
        filteredProducts = products.filter(product => {
            return getStockStatus(product.stock).class === selectedStatus;
        });
    }



    tableBody.innerHTML = filteredProducts.map(product => {
        const status = getStockStatus(product.stock);
        let margin = product.price - product.buyPrice;

        return `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.stock}</td>
            <td>${product.addedAt}</td>
            <td>₹ ${Math.floor(margin)}</td>
            <td>
                <span class="status ${status.class}">
                    ${status.text}
                </span>
            </td>
            <td>
                <button class="edit-product-btn" data-id="${product.id}">
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button class="delete-product-btn" data-id="${product.id}">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </td>
        </tr>
        `;
    }).join("");
};
