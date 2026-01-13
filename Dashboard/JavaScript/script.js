/* ----------------------------- Dashboard Items ---------------------------- */
const ProductsCount = document.getElementById("products-count")
const ProductsStat = document.getElementById("product-stat")
const LowStockCount = document.getElementById("low-stock-count")
const LowStockStat = document.getElementById("low-stock-stat")
const OutOfStock = document.getElementById("out-of-stock-alert")
const OutOfStockStat = document.getElementById("out-of-stock-stat")

const AddProductButton = document.getElementById("add-product-button")

AddProductButton.addEventListener("click", () => {
    document.getElementById("dialog").showModal()
})