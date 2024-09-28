import { dinarFormat } from './dinarFormat.js';

class Cart {

    products;
    #localStorageKey;

    constructor(key) {
        this.#localStorageKey = key;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.products = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.products));
    }


    render(selectedBudget) {

        const cartArea = document.querySelector('.cart-area');
        let cartAreaHtml = '';

        let total = this.getTotal();
        let remaining = this.getRemaining(selectedBudget, total);

        cartAreaHtml += `
            <div class="initial-budget-cart">
                <p class="name">Initial budget : </p>
                <p class="price"> ${dinarFormat(selectedBudget)} </p>
            </div>

            <div class="products-area">
            ${this.generateProduct()}
            </div>
            
            <div class="total">
                <p class="name">Total purchased : </p>
                <p class="price"> ${dinarFormat(total)} </p>
            </div>
            <div class="remaining-budget">
                <p class="name">Remaining budget : </p>
                <p class="price"> ${dinarFormat(remaining)} </p> 
            </div>

            <div class="buttons">
                <button class="archive-order">Archive order</button>
                <button class="reset-order">Reset order</button>
            </div>
        `;
        
        cartArea.innerHTML = cartAreaHtml;
    }

    generateProduct() {

        let productAreaHtml = '';

        this.products.forEach(product => {
            productAreaHtml += `
                <div class="product">
                    <div class="id"><b>ID:</b> ${product.id}</div>
                    <div class="info">
                        <p class="name">${product.name}</p>
                        <p class="price">${dinarFormat(product.price)}</p>
                        <button class="remove-item" data-id="${product.id}">Remove</button>
                    </div>
                </div>
            `;
        });

        return productAreaHtml;
    }

    getTotal() {
        let total = 0;
        cart.products.forEach(product => {
            total += Number(product.price);
        });
        return total;
    }

    getRemaining(selectedBudget, total) {
        return selectedBudget - total;
    }

    clearField(field) {
        field.value = '';
    }

    findMatch(button) {
        let match;
        this.products.forEach(product => {
            if (button.dataset.id === product.id) {
                match = product;
            }
        });
        return match;
    }

    removeMatch(matchingItem) {
        let newProducts = [];
        this.products.forEach(product => {
            if (product !== matchingItem) newProducts.push(product);
        });
        this.products = newProducts;
        this.saveToStorage();
    }
}

const cart = new Cart('cart');

export { cart };