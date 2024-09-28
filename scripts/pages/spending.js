import { handleDarkMode } from '../utils/darkMode.js';
import { randomId } from '../utils/randomId.js';
import { cart } from '../utils/cart.js';
import { history, saveHistory } from '../utils/history.js';

handleDarkMode();

let budget = Number(localStorage.getItem('budget')) || 0;

cart.render(budget);
handleRemoveProduct();
handleReset();
handleArchive();

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
            handleRemoveProduct();
            handleReset();
            handleArchive();

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
            handleRemoveProduct();
            handleReset();
            handleArchive();

            cart.clearField(name);
            cart.clearField(price);
        }
    });
}

function handleRemoveProduct() {
    const buttons = document.querySelectorAll('.remove-item');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const matchingItem = cart.findMatch(button);
            cart.removeMatch(matchingItem);
            cart.render(budget);
            handleRemoveProduct();
        })
    })
}

function handleReset() {
    const resetButton = document.querySelector('.reset-order');
    resetButton.addEventListener('click', () => {

        cart.products = [];
        cart.saveToStorage();

        budget = 0;
        saveBudgetToStorage();

        cart.render(budget);
    });
}

function handleArchive() {
    const archiveButton = document.querySelector('.archive-order');
    archiveButton.addEventListener('click', (e) => {

        if (cart.products.length === 0 || budget === 0) e.preventDefault();
        else {

            history.push({
                purchaseId: randomId(),
                purchaseDate: dayjs().format('MMMM DD, YYYY | HH:mm'),
                budget,
                total: cart.getTotal(),
                remaining: cart.getRemaining(budget, cart.getTotal()),
                products: cart.products
            });
            saveHistory();
    
            cart.products = [];
            cart.saveToStorage();
    
            budget = 0;
            saveBudgetToStorage();
    
            cart.render(budget);
            handleRemoveProduct();
            handleReset();
            handleArchive();
        }
    });
}

function saveBudgetToStorage() {
    localStorage.setItem('budget',budget);
}
