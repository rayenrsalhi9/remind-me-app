import { handleDarkMode } from "../utils/darkMode.js";
import { history } from "../utils/history.js";
import { dinarFormat } from '../utils/dinarFormat.js';

renderHistory();
handleDarkMode();

function renderHistory() {

    const historyBody = document.querySelector('.body');

    let historyHtml = '';

    history.forEach(item => {
        historyHtml += `
            <div class="purchase-container">
                <div class="purchase-container-header">
                    <p> <b>Purchase ID:</b> ${item.purchaseId} </p>
                    <p> <b>Purchase date:</b> ${item.purchaseDate} </p>
                    <p> <b>Initial budget:</b> ${dinarFormat(item.budget)} </p>
                </div>

                <div class="purchase-container-body">
                    ${renderHistoryProducts(item)}
                </div>

                <div class="purchase-container-footer">
                    <p> <b>Total price: </b> ${dinarFormat(item.total)} </p>
                    <p> <b>Remaining budget: </b> ${dinarFormat(item.remainingBudget)} </p>
                </div>
            </div>
        `;
    });

    historyBody.innerHTML = historyHtml;
}

function renderHistoryProducts(item) {
    let productsHtml = '';
    item.products.forEach(product => {
        productsHtml += `
        <div class="product">
            <div class="product-name"> ${product.name} </div>
            <div class="product-price"><b> ${dinarFormat(product.price)} </b></div>
        </div>
        `;
    })
    return productsHtml;
} 