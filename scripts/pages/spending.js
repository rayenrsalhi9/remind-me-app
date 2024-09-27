import { handleDarkMode } from '../utils/darkMode.js';
import { randomId } from '../utils/randomId.js';
import { cart } from '../utils/cart.js';

handleDarkMode();

let budget = Number(localStorage.getItem('budget')) || 0;
cart.render(budget);

handleBudget();
handleProduct();


function handleBudget() {

    const budgetInput = document.querySelector('#initial-budget');
    const addBudgetButton = document.querySelector('.confirm-budget-button');

    addBudgetButton.addEventListener('click', (e) => {
        if (budgetInput.value === '' || isNaN(budgetInput.value)) e.preventDefault();
        else {
            budget = budgetInput.value;
            saveBudgetToStorage();
            cart.render(budget);
            cart.clearField(budgetInput);
        }
    });

}

function handleProduct() {

    const name = document.querySelector('#product-name');
    const price = document.querySelector('#product-price');
    
    const addProductButton = document.querySelector('.add-product-button');

    addProductButton.addEventListener('click', (e) => {
        if (name.value === '' || price.value === '' || isNaN(price.value)) {
            e.preventDefault();
        } else {

            cart.products.push({
                id: randomId(),
                name: name.value,
                price: price.value
            });

            cart.saveToStorage();

            cart.render(budget);

            cart.clearField(name);
            cart.clearField(price);
        }
    });
}

function saveBudgetToStorage() {
    localStorage.setItem('budget',budget);
}
