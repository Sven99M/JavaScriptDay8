var products = [{
        name: "Roses",
        image: "https://cdn.pixabay.com/photo/2017/06/18/21/37/rose-2417334__340.jpg",
        price: 10.00,
        qtty: 1
    }, {
        name: "Tulip",
        image: "https://cdn.pixabay.com/photo/2019/03/21/23/04/tulips-4072214__340.jpg",
        price: 5.00,
        qtty: 1
    }, {
        name: "White Rose",
        image: "https://cdn.pixabay.com/photo/2021/11/15/21/39/rose-6799477__340.jpg",
        price: 12.00,
        qtty: 1
    }, {
        name: "Valentinesday Bouquet",
        image: "https://cdn.pixabay.com/photo/2016/10/05/14/13/flowers-1716747__340.jpg",
        price: 25.00,
        qtty: 1
    },
    {
        name: "Rose Bouquet",
        image: "https://cdn.pixabay.com/photo/2016/03/09/14/49/roses-1246490_960_720.jpg",
        price: 35.00,
        qtty: 1
    },
    {
        name: "Vienna Bouquet",
        image: "https://cdn.pixabay.com/photo/2016/05/20/16/59/flowers-1405552_960_720.jpg",
        price: 55.00,
        qtty: 1
    }
];
for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold">
    <p class ="product-title h3 m-3">${val.name}</p>
    <img class ="product-image" src="${val.image}" width="200"  height="200">
    <div class="product-details" >
        <p class="product-price h4 m-3">${ val.price} €</p>
        <button class="btn btn-primary product-button"  type="button">ADD  TO CART</button>
    </div>
    </div>
    `
}
// print the products 

// add event to the add button 
let btns = document.getElementsByClassName("product-button");


for (let i = 0; i < btns.length; i++) {

    btns[i].addEventListener("click", function() {

        addToCart(products[i]);

    })

}

// adds the addToCart function
var cart = [];

function addToCart(product) {

    if (cart.find((val) => val.name == product.name)) {

        product.qtty++;

    } else {

        cart.push(product);

    }
    createRows();
    Total();
    discount();

}

function plusQtty(i) {

    cart[i].qtty++;

    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;

}

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
}

function deleteItem(i) {

    cart[i].qtty = 1;

    cart.splice(i, 1);

    createRows();

}

function Total() {
    let total = 0;
    let allItems = 0;
    let discountValue = 100;
    let discountAmount = 0;
    for (let val of cart) {
        total += (val.price * val.qtty);
        allItems += (val.qtty);
    }
    if (total >= discountValue) {
        discountAmount = total * 0.9
    }

    document.getElementById("price").innerHTML = total.toFixed(2) + " €";
    document.getElementById("totalitems").innerHTML = allItems;
    document.getElementById("discount").innerHTML = discountAmount;


}

function discount() {



}

// function allItems() {
//     let allItems = 0;
//     for (let val of cart) {
//         allItems += (val.qtty);
//     }
//     document.getElementById("totalitems").innerHTML = allItems
// }

// creates the items in the cart after adding them 

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

    let plus = document.getElementsByClassName("plus");

    let minus = document.getElementsByClassName("minus");

    let del = document.getElementsByClassName("del");


    for (let i = 0; i < plus.length; i++) {

        plus[i].addEventListener("click", function() {

            plusQtty(i);

            Total();
            discount();


        });

        minus[i].addEventListener("click", function() {

            minusQtty(i);

            Total();
            discount();


        });

        del[i].addEventListener("click", function() {

            deleteItem(i);

            Total();
            discount();


        });
    }
}