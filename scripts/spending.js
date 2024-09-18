import { handleDarkMode } from './utils/darkMode.js';
import { cart, renderCart, renderCartProducts, saveCartToStorage, removeFromCart } from './cart.js';
import { randomId } from './utils/randomId.js';

let initialBudget = Number(localStorage.getItem('initial-budget')) || 0;
renderCart(initialBudget, renderCartProducts);
handleDeleteProduct();

handleDarkMode();
handleAddInitialBudget();
handleAddProduct();

function handleAddInitialBudget() {
    const addProductArea = document.querySelector('#initial-budget');
    const addButton = document.querySelector('.confirm-budget-button');

    addButton.addEventListener('click', (e) => {
        if (addProductArea.value === '' || isNaN(addProductArea.value)) {
            e.preventDefault();
        } 
        else {
            initialBudget = Number(addProductArea.value)
            localStorage.setItem('initial-budget', JSON.stringify(initialBudget));
            renderCart(initialBudget, renderCartProducts);
            handleDeleteProduct();
            addProductArea.value = '';
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
            saveCartToStorage();
            renderCart(initialBudget, renderCartProducts);
            handleDeleteProduct();

            productNameInput.value = '';
            productPriceInput.value = '';
        }
    })
}

function handleDeleteProduct() {
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let matchingItem = findMatchingCartItem(button);
            removeFromCart(matchingItem);
            renderCart(initialBudget, renderCartProducts)
            handleDeleteProduct();
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