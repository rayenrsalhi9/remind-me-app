import { handleDarkMode } from '../utils/darkMode.js';
import { cart, generateCartFunction } from '../utils/cart.js';
import { randomId } from '../utils/randomId.js';

let budget = Number(localStorage.getItem('budget')) || 0;
generateCartFunction(budget);

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
            budget = Number(addProductArea.value)
            localStorage.setItem('budget', JSON.stringify(budget));
            generateCartFunction(budget)
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
            generateCartFunction(budget);

            productNameInput.value = '';
            productPriceInput.value = '';
        }
    })
}