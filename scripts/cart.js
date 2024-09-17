import { dinarFormat } from "./utils/dinarFormat.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function renderCartProducts() {
    const productsArea = document.querySelector('.products-area');
    let productsHtml = '';

    cart.forEach(item => {
        productsHtml += `
                <div class="product">
                    <p class="name">${item.name}</p>
                    <p class="price">${dinarFormat(item.price)} TND</p>
                    <button class="remove-item">Remove</button>
                </div>
        `
    });

    productsArea.innerHTML = productsHtml;
}

export function renderCart(initialBudget) {

    const cartArea = document.querySelector('.cart-area');
    let cartHtml = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price;
    });

    const remainingBudget = initialBudget - total;

    cartHtml += `
        <div class="initial-budget-cart">
            <p class="name">Iinitial budget : </p>
            <p class="price">${dinarFormat(initialBudget)}</p>
        </div>

        <div class="products-area"></div>
        
        <div class="total">
            <p class="name">Total purchased : </p>
            <p class="price">${dinarFormat(total)}</p>
        </div>
        <div class="remaining-budget">
            <p class="name">Remaining budget : </p>
            <p class="price">${dinarFormat(remainingBudget)}</p> 
        </div>

        <div class="buttons">
            <button class="archive-order">Archive order</button>
            <button class="reset-order">Reset order</button>
        </div>
    `;

    cartArea.innerHTML = cartHtml;
}