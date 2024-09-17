import { handleDarkMode } from './utils/darkMode.js';
import { renderCart } from './cart.js';

let initialBudget = Number(localStorage.getItem('initial-budget')) || 0;
renderCart(initialBudget);

handleDarkMode();
handleAddProduct();


function handleAddProduct() {
    const addProductArea = document.querySelector('#initial-budget');
    const addButton = document.querySelector('.confirm-budget-button');

    addButton.addEventListener('click', (e) => {
        if (addProductArea.value === '') e.preventDefault();
        else {
            initialBudget = Number(addProductArea.value)
            localStorage.setItem('initial-budget', JSON.stringify(initialBudget));
            checkEmptyCart();
            renderCart(initialBudget);
            addProductArea.value = '';
        }   
    });

}