import { handleDarkMode } from '../utils/darkMode.js';
import { generateCartFunction } from '../utils/cart.js';

let budget = Number(localStorage.getItem('budget')) || 0;
generateCartFunction(budget);

handleDarkMode();
handleAddInitialBudget();

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