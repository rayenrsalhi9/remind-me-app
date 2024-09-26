import { cart, generateCartFunction} from '../../../scripts/utils/cart.js';

describe('test suite: cart', () => {

    it('displays cart on page', () => {

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify({
                name: "7artin 3dham",
                price: "2800",
                id: "id1ef76d30247c3"
            });  
        });

        const testContainer = document.querySelector('.test-container');
        testContainer.innerHTML = `
            <div class="cart-area"></div>
        `;

        generateCartFunction(10000);

        expect(
            cart.length
        ).toEqual(1);

        expect(
            document.querySelector('.cart-area').
            querySelector('.initial-budget-cart').innerText
        ).toContain('10.000 TND');

        expect(
            document.querySelector('.cart-area').
            querySelector('.products-area').
            querySelector('.product').
            querySelector('.name').innerText
        ).toEqual('7artin 3dham');
    });

});