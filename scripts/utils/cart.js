import { dinarFormat } from "../utils/dinarFormat.js";
import { history, saveHistory } from "./history.js";
import { randomId } from "./randomId.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function generateCartFunction(budget) {
    renderCart(budget, renderCartProducts);

    function renderCartProducts() {
        let productsHtml = '';

        cart.forEach(item => {
            productsHtml += `
                    <div class="product">
                        <p class="name">${item.name}</p>
                        <p class="price">${dinarFormat(item.price)}</p>
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                    </div>
            `
        });

        return productsHtml;
    }

    function renderCart(budget, renderCartProducts) {
        const cartArea = document.querySelector('.cart-area');
        let cartHtml = '';

        let total = 0;
        cart.forEach(item => {
            total += Number(item.price);
        });

        const remainingBudget = budget - total;

        cartHtml += `
            <div class="initial-budget-cart">
                <p class="name">Iinitial budget : </p>
                <p class="price">${dinarFormat(budget)}</p>
            </div>

            <div class="products-area">
                ${renderCartProducts()}
            </div>
            
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

        handleDeleteProduct();
        handleReset();
        handleArchiveOrder();
    }

    function removeFromCart(matchingItem) {
        let newCart = [];
        cart.forEach(item => {
            if (item.id !== matchingItem.id) newCart.push(item);
        });
        cart = newCart;
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    function handleDeleteProduct() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                let matchingItem = findMatchingCartItem(button);
                removeFromCart(matchingItem);
                generateCartFunction(budget);
            });    
        });
    }

    function findMatchingCartItem(button) {
        let match;
        let productId = button.dataset.id;
        cart.forEach(item => {
            if (item.id === productId) match = item;
        });
        return match;
    }

    function handleReset() {
        const resetButton = document.querySelector('.reset-order');
        
        resetButton.addEventListener('click', () => {

            cart = [];
            budget = 0;
            
            localStorage.removeItem('budget');
            localStorage.removeItem('cart');
            generateCartFunction(budget);
        });
    }

    function handleArchiveOrder() {
        const archiveButton = document.querySelector('.archive-order');
        archiveButton.addEventListener('click', (e) => {

            if (cart.length === 0 || budget === 0) e.preventDefault()
            else {
                history.push({
                    purchaseId: randomId(),
                    budget: budget,
                    products: cart
                });
                saveHistory();
    
                cart = [];
                budget = 0; 
                localStorage.removeItem('budget');
                localStorage.removeItem('cart');
                
                generateCartFunction(budget);
            }
        });
    }
}   