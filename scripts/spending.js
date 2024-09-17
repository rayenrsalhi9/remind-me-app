import { handleDarkMode } from './utils/darkMode.js';
import { cart, renderCart, renderCartProducts } from './cart.js';

let initialBudget = Number(localStorage.getItem('initial-budget')) || 0;
renderCart(initialBudget, renderCartProducts);

handleDarkMode();
handleAddInitialBudget();
handleAddProduct();


function handleAddInitialBudget() {
    const addProductArea = document.querySelector('#initial-budget');
    const addButton = document.querySelector('.confirm-budget-button');

    addButton.addEventListener('click', (e) => {
        if (addProductArea.value === '') e.preventDefault();
        else {
            initialBudget = Number(addProductArea.value)
            localStorage.setItem('initial-budget', JSON.stringify(initialBudget));
            renderCart(initialBudget);
            addProductArea.value = '';
        }   
    });

}

function handleAddProduct() {
    const productNameInput = document.querySelector('#product-name');   
    const productPriceInput = document.querySelector('#product-price'); 

    const addProductButton = document.querySelector('.add-product-button');
    addProductButton.addEventListener('click', (e) => {
        if (productNameInput.value === '' || productPriceInput.value === '') {
            e.preventDefault();
        } else {
            cart.push({
                name: `${productNameInput.value}`,
                price: `${productPriceInput.value}`
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(initialBudget, renderCartProducts);

            productNameInput.value = '';
            productPriceInput.value = '';
        }
    })
}