import { dinarFormat } from "../utils/dinarFormat.js";
import { history, saveHistory } from "./history.js";
import { randomId } from "./randomId.js";

let cart = loadFromStorage();

export function generateCartFunction(budget) {
    
    renderCart(budget, renderCartProducts);

    handleAddProduct();

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

        let remainingBudget = budget - total;

        cartHtml += `
            <div class="initial-budget-cart">
                <p class="name">Initial budget : </p>
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
        handleArchiveOrder(total, remainingBudget);
    }

    function removeFromCart(matchingItem) {
        let newCart = [];
        cart.forEach(item => {
            if (item.id !== matchingItem.id) newCart.push(item);
        });
        cart = newCart;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

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
            
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('budget', JSON.stringify(budget));

            generateCartFunction(budget);
        });
    }

    function handleArchiveOrder(total, remainingBudget) {
        const archiveButton = document.querySelector('.archive-order');
        archiveButton.addEventListener('click', (e) => {

            if (cart.length === 0 || budget === 0) e.preventDefault()
            else {
                history.push({
                    purchaseId: randomId(),
                    purchaseDate: dayjs().format('MMMM D, YYYY  HH:mm'),

                    budget,
                    total,
                    remainingBudget,

                    products: cart
                });
                saveHistory();
    
                cart = [];
                budget = 0; 
                
                localStorage.setItem('cart', JSON.stringify(cart));
                localStorage.setItem('budget', JSON.stringify(budget));
                
                generateCartFunction(budget);
            }
        });
    }

    function handleAddProduct() {

        const productNameInput = document.querySelector('#product-name');   
        const productPriceInput = document.querySelector('#product-price'); 
    
        const addProductButton = document.querySelector('.add-product-button');
        addProductButton.addEventListener('click', (e) => {
            if (productNameInput.value === '' || 
                productPriceInput.value === '' || 
                isNaN(productPriceInput.value)) {
    
                e.preventDefault();
    
            } else {
                cart.push({
                    name: `${productNameInput.value}`,
                    price: `${productPriceInput.value}`,
                    id: `${randomId()}`
                });
                
                localStorage.setItem('cart', JSON.stringify(cart));
                generateCartFunction(budget);
    
                productNameInput.value = '';
                productPriceInput.value = '';
            }
        })
    }
}   

export function loadFromStorage() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}