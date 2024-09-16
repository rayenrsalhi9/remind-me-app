export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function checkEmptyCart() {

    const img = document.querySelector('.body-right-section img');
    const p = document.querySelector('.body-right-section p');

    if (cart.length === 0) {
        img.style.display = 'block';
        p.style.display = 'block';
    } else {
        img.style.display = 'none';
        p.style.display = 'none';
    }

}