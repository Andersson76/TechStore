
function getProducts() {

    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let section = document.getElementsByClassName("containerCart")[0];
    section.innerHTML = ""

    for (var i = 0; i < cart.length; i++) {
        let itemContainer = renderCartContainer(cart[i]);

        section.appendChild(itemContainer)
    };
    checkOut(cart)
}


function renderCartContainer(cartItem) {

    let itemContainer = document.createElement("div")
    itemContainer.classList.add("itemContainer")

    let cartImgContainer = document.createElement("div")
    cartImgContainer.classList.add("cartImgContainer")

    let itemImg = document.createElement("img")
    itemImg.classList.add("itemImg")
    itemImg.src =  "./assets/" + cartItem.product.image

    cartImgContainer.append(itemImg)

    let itemTitleContainer = document.createElement("div")
    itemTitleContainer.classList.add("itemTitleContainer")

    let itemTitle = document.createElement("h1")
    itemTitle.classList.add("itemTitle")
    itemTitle.innerText = cartItem.product.title

    let productQuantity = document.createElement("h3")
    productQuantity.classList.add("productQuantity")
    productQuantity.innerText = cartItem.quantity + " " + "st"

    itemTitleContainer.append(itemTitle, productQuantity)

    let itemPriceContainer = document.createElement("div")
    itemPriceContainer.classList.add("itemPriceContainer")

    let itemPrice = document.createElement("h2")
    itemPrice.classList.add("itemPrice")
    itemPrice.innerText = cartItem.product.price + " kr"

    itemPriceContainer.append(itemPrice)

    let deleteItemButton = document.createElement("div")
    deleteItemButton.classList.add("deleteItemButton")
    deleteItemButton.addEventListener("click", () => {
        removeItemFromCart(cartItem)
        getItemsNumber()

    });

    let icon = document.createElement("i")
    icon.className = "far fa-trash-alt"
    icon.classList.add("trashcanCart")

    let buttonRemoveItemTextContainer = document.createElement("div")
    buttonRemoveItemTextContainer.innerText = "Ta bort"

    deleteItemButton.append(icon, buttonRemoveItemTextContainer)


    itemContainer.append(cartImgContainer, itemTitleContainer, itemPriceContainer, deleteItemButton)
    return itemContainer
}

function removeItemFromCart(cartItem) {

    let cart = JSON.parse(localStorage.getItem("cart"));

    for (var i = 0; i < cart.length; i++) {
        if (cartItem.product.title == cart[i].product.title) {
            cart.splice(i, 1);
        }
    }
    cart = JSON.stringify(cart);

    localStorage.setItem("cart", cart);

    getProducts()
}

function checkOut(cart) {

    let totalAmount = 0
    cart.forEach((cartItem) => {
        totalAmount += cartItem.product.price * cartItem.quantity
    })

    let containerPrice = document.getElementsByClassName("containerPrice")[0]
    containerPrice.innerHTML = ""

    let totalPriceContainer = document.createElement("div")
    totalPriceContainer.classList.add("totalPriceContainer")
    totalPriceContainer.innerText = "Summa:" + " " + totalAmount + " " + "kr"
    containerPrice.append(totalPriceContainer)


    let containerPurchase = document.getElementsByClassName("containerPurchase")[0]

    let purchaseButton = document.createElement("div")
    purchaseButton.classList.add("purchaseButton")

    let confirmButton = document.createElement("div")
    confirmButton.classList.add("confirmButton")
    confirmButton.innerText = "Slutför ditt köp"
    confirmButton.addEventListener("click", () => {
        alert("Tack för ditt köp, välkommen åter !")
        localStorage.removeItem("cart")
        window.location = "index.html"

    })

    let checkIcon = document.createElement("i")
    checkIcon.className = "fas fa-check"
    checkIcon.classList.add("checkIcon")

    containerPurchase.append(purchaseButton, checkIcon, confirmButton)
    totalPriceContainer.append(containerPurchase)
}

function getItemsNumber() {

    let cartNumber = document.getElementById("quantity")
    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let totalAmount = cart.reduce((amount, item) => amount + item.quantity, 0);
    cartNumber.innerText = totalAmount
}

window.addEventListener("load", () => {
    getItemsNumber()
    getProducts()
})