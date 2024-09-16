import {handleDarkMode} from './utils/darkMode.js';
import { cart, checkEmptyCart } from './cart.js';

handleDarkMode();
//checkEmptyCart();
//handleAddProduct();

function handleAddProduct() {

    const addProductArea = document.querySelector('#initial-budget');
    const addButton = document.querySelector('.confirm-budget-button');

    addButton.addEventListener('click', (e) => {
        if (addProductArea.value === '') e.preventDefault();
        else {
            cart.push(addProductArea.value);
            console.log(cart);
            localStorage.setItem('cart', JSON.stringify(cart));
            checkEmptyCart();
        }
        
    });

    
}