//Grab data from JSON file
var data = JSON.parse(products);
var cartItems = document.getElementsByClassName("products");

// Create the Individual Product Items
for (val of data) {
    cartItems[0].innerHTML += `<div class="card border-0" style="width: 18rem;">
  <img src="${val.image}" class="card-img-top" alt="...">
  <div class="card-body text-center">
      <h5 class="card-title">${val.name}</h5>
      <p class="card-text">${val.price} Euro</p>
      <button class="btn btn-secondary">ADD TO CHART</button>
  </div>
</div>`
}

// Loop through the cartButtons and add Event Listeners
var cartButton = document.getElementsByClassName("btn");

for (let i = 0; i < cartButton.length; i++) {
    cartButton[i].addEventListener("click", function() {
        addToCart(data[i]);
    })
}

//Create addCartFunction
var cart = [];

function addToCart(product) {
    if (cart.find((val) => val.name == product.name)) {
        product.qtty++;
    } else {
        cart.push(product);
    }
    createRows();
    total();
}

//Create Rows within HTML
function createRows() {
    var result = "";
    for (let val of cart) {
        result += `
    <div class="cart-row row d-flex">
        <div class="cart-item col-6 my-3 ">
            <img class="cart-item-image" src="${val.image}" width="100" height="100">
            <span class="cart-item-title h5 ">${val.name}</span>
        </div>
        <span class="cart-price col-3 h4 my-3">${val.price} €</span>
        <div class="cart-qtty-action col-3 d-flex">            
            <i class="minus fa fa-minus-circle my-auto" ></i>            
            <div class="cart-quantity p-4 h4">${val.qtty}</div>            
            <i class="plus fa fa-plus-circle my-auto"></i>        
            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
        </div>
    </div>
    `;
    }
    document.getElementById("cart-items").innerHTML = result;

    // Loop through Plusses / Minusses and Delete Buttons
    var plus = document.getElementsByClassName("plus");
    var minus = document.getElementsByClassName("minus");
    var del = document.getElementsByClassName("del");

    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", function() {
            plusQtty(i);
            total();
        })
        minus[i].addEventListener("click", function() {
            minusQtty(i);
            total();
        })
        del[i].addEventListener("click", function() {
            deleteItem(i);
            total();
        })
    }
}

//Calculate total sum
function total() {
    var total = 0;
    var discountValue = 50;
    var newTotal = 0;
    //add Quantity
    var quantity = 0;
    for (let val of cart) {
        total = total + (val.price * val.qtty);
        if (total >= discountValue) {
            newTotal = total * 0.9;
        }

        //add Quantity
        quantity += (val.qtty);
    }
    document.getElementById("price").innerHTML = total.toFixed(2);
    //add Quantity
    document.getElementById("quantity").innerHTML = quantity;
    //Discount
    document.getElementById("discount").innerHTML = newTotal.toFixed(2);
}

//Create Plus function
function plusQtty(i) {
    cart[i].qtty++;
    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
}

//Create Minus function
function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty--;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

//Create Delete function
function deleteItem(i) {
    cart[i].qtty = 1;
    cart.splice(i, 1);
    createRows();
}