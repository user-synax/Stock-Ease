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

window.addEventListener("load", () => {
    loadBarData()
    renderLowStockChart()
})



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
    const LOW_STOCK_LIMIT = 10;

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



const products = JSON.parse(localStorage.getItem("products")) || [];

/* ---------------- KPI CALCULATIONS ---------------- */

let totalInventoryValue = 0;
let lowStock = 0;
let outOfStock = 0;

products.forEach(p => {
    totalInventoryValue += p.stock * p.buyPrice;

    if (p.stock === 0) outOfStock++;
    else if (p.stock <= 10) lowStock++;
});

document.getElementById("totalInventoryValue").innerText =
    `₹ ${totalInventoryValue.toLocaleString()}`;

document.getElementById("lowStockCount").innerText = lowStock;
document.getElementById("outOfStockCount").innerText = outOfStock;

/* ---------------- STOCK HEALTH CHART ---------------- */

new Chart(document.getElementById("stockHealthChart"), {
    type: "doughnut",
    data: {
        labels: ["In Stock", "Stock Soon", "Out of Stock"],
        datasets: [{
            data: [
                products.length - lowStock - outOfStock,
                lowStock,
                outOfStock
            ],
            backgroundColor: ["#22c55e", "#facc15", "#ef4444"]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "bottom" }
        }
    }
});

/* ---------------- STOCK VALUE BY CATEGORY ---------------- */

const categoryValue = {};

products.forEach(p => {
    const value = p.stock * p.buyPrice;
    categoryValue[p.category] = (categoryValue[p.category] || 0) + value;
});

new Chart(document.getElementById("stockValueCategoryChart"), {
    type: "bar",
    data: {
        labels: Object.keys(categoryValue),
        datasets: [{
            label: "Stock Value (₹)",
            data: Object.values(categoryValue),
            backgroundColor: "#3b82f6"
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: { legend: { display: false } }
    }
});

/* ---------------- TOP PROFITABLE PRODUCTS ---------------- */

const profitProducts = products.map(p => ({
    name: p.name,
    profit: (p.price - p.buyPrice) * p.stock
}));

profitProducts.sort((a, b) => b.profit - a.profit);

const top5 = profitProducts.slice(0, 5);

new Chart(document.getElementById("topProfitProductsChart"), {
    type: "bar",
    data: {
        labels: top5.map(p => p.name),
        datasets: [{
            label: "Total Profit (₹)",
            data: top5.map(p => p.profit),
            backgroundColor: "#0b855c"
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: { legend: { display: false } }
    }
});


/* ----------------------------- Download Report ---------------------------- */

document.getElementById("downloadInventoryReport").addEventListener("click", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];

    if (products.length === 0) {
        alert("No products available");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    /* ---------------- HEADER ---------------- */

    doc.setFontSize(18);
    doc.text("Inventory Report", 14, 15);

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

    /* ---------------- KPI CALCULATIONS ---------------- */

    let totalValue = 0;
    let lowStock = 0;
    let outOfStock = 0;

    products.forEach(p => {
        totalValue += p.stock * p.buyPrice;
        if (p.stock === 0) outOfStock++;
        else if (p.stock <= 10) lowStock++;
    });

    /* ---------------- KPI SECTION ---------------- */

    doc.setFontSize(12);
    doc.text("Summary", 14, 32);

    doc.setFontSize(10);
    doc.text(`Total Products: ${products.length}`, 14, 40);
    doc.text(`Total Inventory Value: ₹ ${totalValue}`, 14, 46);
    doc.text(`Low Stock Products: ${lowStock}`, 14, 52);
    doc.text(`Out of Stock Products: ${outOfStock}`, 14, 58);

    /* ---------------- TABLE DATA ---------------- */

    const tableData = products.map(p => {
        let status = "In Stock";
        if (p.stock === 0) status = "Out of Stock";
        else if (p.stock <= 10) status = "Stock Soon";

        return [
            p.id,
            p.name,
            p.category,
            p.stock,
            `₹${p.buyPrice}`,
            `₹${p.price}`,
            `₹${p.price - p.buyPrice}`,
            status
        ];
    });

    /* ---------------- INVENTORY TABLE ---------------- */

    doc.autoTable({
        startY: 65,
        head: [[
            "ID",
            "Name",
            "Category",
            "Stock",
            "Buy Price",
            "Sell Price",
            "Profit/Unit",
            "Status"
        ]],
        body: tableData,
        styles: {
            fontSize: 9
        },
        headStyles: {
            fillColor: [37, 99, 235]
        }
    });

    /* ---------------- SAVE PDF ---------------- */

    const fileName = `Inventory_Report_${new Date().toLocaleDateString()}.pdf`;
    doc.save(fileName);
});

