/* ----------------------------- Dashboard Items ---------------------------- */
const ProductsCount = document.getElementById("products-count")
const ProductsStat = document.getElementById("product-stat")

/* -------------------------------- Invenotry ------------------------------- */
const InventoryValue = document.getElementById("Inventory-value")
const InventoryStat = document.getElementById("Inventory-stat")

/* ---------------------------------- Stock --------------------------------- */
const LowStockCount = document.getElementById("low-stock-count")
const LowStockStat = document.getElementById("low-stock-stat")

/* ------------------------------ Out of Stock ------------------------------ */
const OutOfStock = document.getElementById("out-of-stock-alert")
const OutOfStockStat = document.getElementById("out-of-stock-stat")

const AddProductButton = document.getElementById("add-product-button")

const LogOutButton = document.getElementById("logout-tab")

const SuccessLogout = document.getElementById("success-logout")
const DiscardLogout = document.getElementById("discard-logout")

const closeAddProductIcon = document.getElementById("closeAddProduct")

AddProductButton.addEventListener("click", () => {
    document.getElementById("add_product").show()
})

LogOutButton.addEventListener("click", () => {
    document.getElementById("log_out").showModal()
})

SuccessLogout.addEventListener("click", () => {
    location.href = '../../index.html'
})

DiscardLogout.addEventListener("click", () => {
    document.getElementById("log_out").close()
})

closeAddProductIcon.addEventListener("click", () => {
    document.getElementById("add_product").close()
})




/* -------------------------------------------------------------------------- */
/*                               OnLoad Function                              */
/* -------------------------------------------------------------------------- */

const Reload = () => {
    DisplayProduct()
    DisplyInvenotryValue()
    RenderProductsList()
}

const DisplayProduct = () => {
    let AllProducts = JSON.parse(localStorage.getItem("products"))

    if (!AllProducts) {
        return
    } else {
        ProductsCount.textContent = AllProducts.length
        let TotalStockProducts = 0
        AllProducts.forEach(product => {
            const totalStock = Number(product.stock);
            TotalStockProducts += totalStock
        });
        ProductsStat.textContent = `Total Stock Items: [ ${TotalStockProducts} ]`
    }
}

const DisplyInvenotryValue = () => {
    let AllProducts = JSON.parse(localStorage.getItem("products"))
    let TotalStockValue = 0
    AllProducts.forEach(product => {
        const total = Number(product.price) * Number(product.stock);
        TotalStockValue += total
    });
    InventoryValue.textContent = `₹${TotalStockValue}`

    if (TotalStockValue > 100000000) {
        InventoryStat.textContent = 'Multi-Millionaire'
    } else if (TotalStockValue > 10000000) {
        InventoryStat.textContent = 'Millionaire'
    } else if (TotalStockValue > 1000000) {
        InventoryStat.textContent = 'Almost Millionaire'
    } else if (TotalStockValue > 100000) {
        InventoryStat.textContent = 'Lakhpati'
    } else if (TotalStockValue > 60000 && TotalStockValue < 10000) {
        InventoryStat.textContent = 'Noteworthy'
    } else if (TotalStockValue > 10000 && TotalStockValue < 60000) {
        InventoryStat.textContent = 'Average'
    } else if (TotalStockValue > 5000 && TotalStockValue < 10000) {
        InventoryStat.textContent = 'Below Average'
    } else if (TotalStockValue > 1000 && TotalStockValue < 5000) {
        InventoryStat.textContent = 'Starter Pack'
    }
}


window.addEventListener('load', () => {
    Reload()
})

/* -------------------------------------------------------------------------- */
/*                             Adding Localstorage                            */
/* -------------------------------------------------------------------------- */

/* ------------------------------- Add Product ------------------------------ */

const AddProductFormButton = document.getElementById("_add_product_button_")

let Products = []

const validProductForm = () => {
    const ErrorColor = '#ef4444'
    const SuccessColor = '#10b981'
    const InputBorder = '#28282c'

    const Getname = document.getElementById('product-name')
    const Getcategory = document.getElementById('product-category')
    const GetBuyPrice = document.getElementById("product-buy-price")
    const Getprice = document.getElementById('product-price')
    const Getstock = document.getElementById('product-stock')
    const Getdescription = document.getElementById('product-desc')

    const name = Getname.value.trim()
    const category = Getcategory.value.trim()
    const price = Getprice.value.trim()
    const stock = Getstock.value.trim()
    const description = Getdescription.value.trim()
    const buyPrice = GetBuyPrice.value.trim()

    if (!name || !category || !price || !stock || !buyPrice) {
        Getname.style.border = `2px solid ${ErrorColor}`
        Getcategory.style.border = `2px solid ${ErrorColor}`
        Getprice.style.border = `2px solid ${ErrorColor}`
        Getstock.style.border = `2px solid ${ErrorColor}`
        GetBuyPrice.style.border = `2px solid ${ErrorColor}`

        Snackbar.show({
            text: 'Please Fill all the Fields',
            showAction: false,
            pos: 'bottom-right',
            backgroundColor: `${ErrorColor}`,
            duration: 3000
        }
        )
        setTimeout(() => {
            Getname.style.border = `2px solid ${InputBorder}`
            Getcategory.style.border = `2px solid ${InputBorder}`
            Getprice.style.border = `2px solid ${InputBorder}`
            Getstock.style.border = `2px solid ${InputBorder}`
        }, 3000)
    } else {
        let date = new Date()
        let timeShort = date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })

        let products = JSON.parse(localStorage.getItem("products")) || [];
        let ProductId = ''
        for (let i = 0; i < 4; i++) {
            let GenerateRandomID = Math.floor(Math.random() * 1000)
            ProductId += GenerateRandomID
        }

        let ObjectProductData = {
            id: ProductId,
            name: name,
            category: category,
            price: price,
            stock: stock,
            description: description,
            buyPrice: buyPrice,
            addedAt: timeShort
        }

        products.push(ObjectProductData)

        localStorage.setItem("products", JSON.stringify(products));

        Snackbar.show({
            text: 'New Product Added',
            showAction: false,
            pos: 'bottom-right',
            backgroundColor: `${SuccessColor}`,
        })

        Getname.textContent = ''
        Getprice.textContent = ''
        Getstock.textContent = ''
        Getdescription.textContent = ''
        Reload()
        document.getElementById("add_product").close()
    }
}

AddProductFormButton.addEventListener("click", () => {
    validProductForm()
})

/* ----------------------- Adding New Products On List ---------------------- */


const RenderProductsList = () => {
    const tableBody = document.querySelector(".stock-table tbody");
    const ListStatus = document.getElementById("list-status")
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const getStockStatus = (stock) => {
        if (stock > 20) {
            return { text: "In Stock", class: "in-stock" };
        } else if (stock > 0) {
            return { text: "Stock Soon", class: "low-stock" };
        } else {
            return { text: "Out of Stock", class: "out-stock" };
        }
    }
    ListStatus.style.display = 'none'
    tableBody.innerHTML = products
        .map((product) => {
            const status = getStockStatus(product.stock);
            let margin =  ((product.price - product.buyPrice) / product.price) * 100;
            return `
            <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.stock}</td>
            <td>${product.addedAt}</td>
            <td>${Math.floor(margin)}%</td>
            <td>
            <span class="status ${status.class}">
                ${status.text}
            </span>
            </td>
            </tr>
        `;
        })
        .join("");
}



























category: "electronics"
description: "Zebronics"
id: "593679323398"
name: "Keyboard"
price: "299"
stock: "50"
