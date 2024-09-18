import { handleDarkMode } from '../utils/darkMode.js';
import { cart, generateCartFunction } from '../utils/cart.js';
import { randomId } from '../utils/randomId.js';

let initialBudget = Number(localStorage.getItem('budget')) || 0;
generateCartFunction(initialBudget);

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
            localStorage.setItem('budget', JSON.stringify(initialBudget));
            generateCartFunction(initialBudget)
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
            
            localStorage.setItem('cart', JSON.stringify(cart));
            generateCartFunction(initialBudget);

            productNameInput.value = '';
            productPriceInput.value = '';
        }
    })
}