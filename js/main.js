var listOfProducts;

// products from the json file and store it in a global variable
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductToWebpage();

    });
}

function initSite() {
    loadProducts();

}


function addProductToWebpage() {

    let main = document.getElementsByTagName("main")[0];
    let isGrey = false

    for (var i = 0; i <listOfProducts.length; i++) {
        let productContainer = createProductContainer(listOfProducts[i], isGrey);

        main.appendChild(productContainer)
        isGrey = !isGrey
    };

}


function createProductContainer(product, isGrey) {
    let productContainer = document.createElement("div")
    productContainer.classList.add("productContainer")
    if(isGrey){
        productContainer.style.backgroundColor = ("#f5f5f5")
    }
    let textContainer = document.createElement("div")
    textContainer.classList.add("textContainer")

    let titleText = document.createElement("h1")
    titleText.classList.add("titleText")
    titleText.innerText = product.title

    let descriptionText = document.createElement("h3")
    descriptionText.classList.add("descriptionText")
    descriptionText.innerText = product.description

    textContainer.append(titleText, descriptionText)

    let imageContainer = document.createElement("div")
    imageContainer.classList.add("imageContainer")

    let phoneImg = document.createElement("img")
    phoneImg.classList.add("phoneImg")
    phoneImg.src =  "./assets/" + product.image

    imageContainer.append(phoneImg)

    let priceContainer = document.createElement("div")
    priceContainer.classList.add("priceContainer")

    let priceText = document.createElement("h2")
    priceText.classList.add("priceText")
    priceText.innerText = product.price + " kr"

    priceContainer.append(priceText)

    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    buttonContainer.addEventListener("click", () =>  {
        addToCart(product)
    });

    let icon = document.createElement("i")
    icon.className = "fas fa-cart-arrow-down"
    icon.classList.add("cartIcon")

    let buttonTextContainer = document.createElement("div")
    buttonTextContainer.innerText = "Lägg till i kundvagnen"

    buttonContainer.append(icon, buttonTextContainer)

    productContainer.append(textContainer, imageContainer, priceText, buttonContainer)
    return productContainer

}


window.addEventListener("load", () => {
    initSite()
    getItemsNumber()
})

function addToCart(product) {

    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let productIndex = cart.findIndex((cartItem) => {
        return cartItem.product.title == product.title
    })

    if(productIndex >= 0) {
        cart[productIndex].quantity++
    } else {
        cart.push({
            product: product,
            quantity: 1
        })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
        getItemsNumber()
}

function getItemsNumber() {

    let cartNumber = document.getElementById("quantity")
    let cart = localStorage.getItem("cart")

    if(cart) {
        cart = JSON.parse(cart)
    } else {
        cart = []
    }

    let totalAmmount= cart.reduce((ammount,item) => ammount + item.quantity, 0);
    cartNumber.innerText = totalAmmount

}