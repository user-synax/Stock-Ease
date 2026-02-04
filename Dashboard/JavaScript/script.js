/* ------------------------------ Welcome User ------------------------------ */
let userWelcomeText = document.getElementById("user-welcome")

/* ----------------------------- Dashboard Items ---------------------------- */
const ProductsCount = document.getElementById("products-count");
const ProductsStat = document.getElementById("product-stat");

/* -------------------------------- Invenotry ------------------------------- */
const InventoryValue = document.getElementById("Inventory-value");
const InventoryStat = document.getElementById("Inventory-stat");

/* ---------------------------------- Stock --------------------------------- */
const LowStockCount = document.getElementById("low-stock-count");
const LowStockStat = document.getElementById("low-stock-stat");

/* ------------------------------ Out of Stock ------------------------------ */
const OutOfStock = document.getElementById("out-of-stock-alert");
const OutOfStockStat = document.getElementById("out-of-stock-stat");

const AddProductButton = document.getElementById("add-product-button");

const closeAddProductIcon = document.getElementById("closeAddProduct");
const GetSearchProductInput = document.getElementById("searchProduct");

const LogOutButton = document.getElementById("logout-tab");

const SuccessLogout = document.getElementById("success-logout");
const DiscardLogout = document.getElementById("discard-logout");

const AddProdyuctDialog = document.getElementById("add_product")

AddProductButton.addEventListener("click", () => {
    document.getElementById("add_product").show();
});

LogOutButton.addEventListener("click", () => {
    document.getElementById("log_out").showModal();
});

SuccessLogout.addEventListener("click", () => {
    location.href = "../../index.html";
});

DiscardLogout.addEventListener("click", () => {
    document.getElementById("log_out").close();
});

closeAddProductIcon.addEventListener("click", () => {
    document.getElementById("add_product").close();
});

/* -------------------------------------------------------------------------- */
/*                               OnLoad Function                              */
/* -------------------------------------------------------------------------- */

const Reload = () => {
    setUsername()
    DisplayProduct();
    DisplyInvenotryValue();
    RenderProductsList();
    checkLowStock();
    checkOutOfStock();
    loadBarData()
    renderLowStockChart()
    loadBarData()
    renderLowStockChart()
};

const setUsername = () => {
    let UserDetails = JSON.parse(localStorage.getItem("user"));

    if (!UserDetails) {
        userWelcomeText.textContent = `Dashboard Overview`
    } else {
        userWelcomeText.textContent = `${UserDetails.Username}`
    }
}


const DisplayProduct = () => {
    let AllProducts = JSON.parse(localStorage.getItem("products"));
    if (!AllProducts) {
        return;
    } else {
        ProductsCount.innerHTML = `<count-up>${AllProducts.length}</count-up>`;
        let TotalStockProducts = 0;
        AllProducts.forEach((product) => {
            const totalStock = Number(product.stock);
            TotalStockProducts += totalStock;
        });
        ProductsStat.textContent = `Total Stock Items: [ ${TotalStockProducts} ]`;
    }
};

const DisplyInvenotryValue = () => {
    let AllProducts = JSON.parse(localStorage.getItem("products"));
    totalInventoryValue = 0
    AllProducts.forEach(p => {
        totalInventoryValue += p.stock * p.buyPrice;
    });

    document.getElementById("Inventory-value").innerHTML =
        `<count-up>${totalInventoryValue.toLocaleString()}</count-up>`;

    if (totalInventoryValue > 100000000) {
        InventoryStat.textContent = "Multi-Millionaire";
    } else if (totalInventoryValue > 10000000) {
        InventoryStat.textContent = "Millionaire";
    } else if (totalInventoryValue > 1000000) {
        InventoryStat.textContent = "Almost Millionaire";
    } else if (totalInventoryValue > 100000) {
        InventoryStat.textContent = "Lakhpati";
    } else if (totalInventoryValue > 60000 && totalInventoryValue < 10000) {
        InventoryStat.textContent = "Noteworthy";
    } else if (totalInventoryValue > 10000 && totalInventoryValue < 60000) {
        InventoryStat.textContent = "Average";
    } else if (totalInventoryValue > 5000 && totalInventoryValue < 10000) {
        InventoryStat.textContent = "Below Average";
    } else if (totalInventoryValue > 1000 && totalInventoryValue < 5000) {
        InventoryStat.textContent = "Starter Pack";
    }
};

window.addEventListener("load", () => {
    Reload();
});

/* -------------------------------------------------------------------------- */
/*                             Adding Localstorage                            */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Add Product ------------------------------ */

const AddProductFormButton = document.getElementById("_add_product_button_");

let Products = [];
let editingProductId = null;

const validProductForm = () => {
    const ErrorColor = "#ef4444";
    const SuccessColor = "#10b981";
    const InputBorder = "#28282c";

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

    if (!name || !category || !price || !stock || !buyPrice) {
        Getname.style.border = `2px solid ${ErrorColor}`;
        Getcategory.style.border = `2px solid ${ErrorColor}`;
        Getprice.style.border = `2px solid ${ErrorColor}`;
        Getstock.style.border = `2px solid ${ErrorColor}`;
        GetBuyPrice.style.border = `2px solid ${ErrorColor}`;

        Snackbar.show({
            text: "Please Fill all the Fields",
            showAction: false,
            pos: "bottom-right",
            backgroundColor: `${ErrorColor}`,
            duration: 3000,
        });
        let Errorsound = new Audio()
        Errorsound.src = "../../Assets/Sound/error.mp3"
        Errorsound.play()
        setTimeout(() => {
            Getname.style.border = `2px solid ${InputBorder}`;
            Getcategory.style.border = `2px solid ${InputBorder}`;
            Getprice.style.border = `2px solid ${InputBorder}`;
            Getstock.style.border = `2px solid ${InputBorder}`;
            GetBuyPrice.style.border = `2px solid ${InputBorder}`;
        }, 3000);
    } else {
        let date = new Date();
        let timeShort = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
        let products = JSON.parse(localStorage.getItem("products")) || [];

        let ProductId = "";
        for (let i = 0; i < 4; i++) {
            let GenerateRandomID = Math.floor(Math.random() * 100);
            ProductId += GenerateRandomID;
        }

        let ObjectProductData = {
            id: ProductId,
            name: name,
            category: category,
            price: price,
            stock: stock,
            description: description,
            buyPrice: buyPrice,
            addedAt: timeShort,
        };

        products.push(ObjectProductData);

        localStorage.setItem("products", JSON.stringify(products));

        Snackbar.show({
            text: "New Product Added",
            showAction: false,
            pos: "bottom-right",
            backgroundColor: `${SuccessColor}`,
        });

        let sound = new Audio()
        sound.src = "../../Assets/Sound/add_product.mp3"

        Getname.textContent = "";
        Getprice.textContent = "";
        Getstock.textContent = "";
        Getdescription.textContent = "";
        AddProdyuctDialog.close()
        sound.play()
        Reload();
    }
};

AddProductFormButton.addEventListener("click", () => {
    validProductForm();
});

window.addEventListener("keydown", e => {
    if (e.altKey = true && e.key == "n") {
        document.getElementById("add_product").show();
    }
})

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
            </tr>
        `;
        })
        .join("");
};

/* --------------------------- Updating Info Cards -------------------------- */

const checkLowStock = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let StockCount = 0;
    products.map((product) => {
        if (product.stock <= 5) {
            StockCount += 1;
        }
    });
    LowStockCount.innerHTML = `<count-up>${StockCount}</count-up>`;
    LowStockStat.textContent = "Check Your Stock";
};

const checkOutOfStock = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let OutOfStockCount = 0;
    products.map((product) => {
        if (product.stock == 0) {
            OutOfStockCount += 1;
        }
    });
    OutOfStock.innerHTML = `<count-up>${OutOfStockCount}</count-up>`;
    OutOfStockStat.textContent = "Rerack Your Products";
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
            </tr>
        `;
        })
        .join("");
};

GetSearchProductInput.addEventListener("input", (e) => {
    SearchProduct(e.target.value);
});

/* --------------------------------- Charts --------------------------------- */

/* -------------------------------- Bar Chart ------------------------------- */

const loadBarData = () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const categoryCounts = {};

    products.forEach((product) => {
        categoryCounts[product.category] =
            (categoryCounts[product.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts);
    const productCounts = Object.values(categoryCounts);

    const salesChartCtx = document
        .getElementById("salesChart")
        .getContext("2d");

    new Chart(salesChartCtx, {
        type: "bar",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Products per Category",
                    data: productCounts,
                    backgroundColor: "#3b82f6",
                    borderRadius: 5,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                    },
                },
            },
        },
    });
};

// Low Stock Data
const renderLowStockChart = () => {
    const canvas = document.getElementById("lowStockChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];
    const LOW_STOCK_LIMIT = 5;

    // Filter low stock products
    const lowStockProducts = products.filter(
        product => Number(product.stock) <= LOW_STOCK_LIMIT
    );

    // Group by category
    const categoryMap = {};

    lowStockProducts.forEach(product => {
        if (!categoryMap[product.category]) {
            categoryMap[product.category] = 0;
        }
        categoryMap[product.category]++;
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    if (window.lowStockChartInstance) {
        window.lowStockChartInstance.destroy();
    }

    window.lowStockChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Low Stock Products",
                data,
                borderWidth: 1,
                backgroundColor: '#94a3b8'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) =>
                            `${ctx.raw} product need restock`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
};

const showLowStockAert = (() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let StockCount = 0;
    products.map((product) => {
        if (product.stock <= 5) {
            StockCount += 1;
        }
    });
    if (!StockCount) return
    Snackbar.show({
        text: `[ ${StockCount} ] Items getting out of stock soon...`,
        showAction: false,
        pos: "bottom-right",
        backgroundColor: `#d5e400`,
        textColor: 'black'
    });
})()

const showOutOfStockAert = (() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    let OutOfStockCount = 0;
    products.map((product) => {
        if (product.stock == 0) {
            OutOfStockCount += 1;
        }
    });
    if (!OutOfStockCount) return
    Snackbar.show({
        text: `[ ${OutOfStockCount} ] Items are out of stock`,
        showAction: false,
        pos: "bottom-right",
        backgroundColor: `#ef4444`,
        textColor: 'black'
    });
})()