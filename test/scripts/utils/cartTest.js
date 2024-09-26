import { cart, generateCartFunction} from '../../../scripts/utils/cart.js';

describe('test suite: cart', () => {

    const testContainer = document.querySelector('.test-container');

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify({
                name: "7artin 3dham",
                price: "2800",
                id: "id1ef76d30247c3"
            });  
        });

        testContainer.innerHTML = `
            <div class="cart-area"></div>
        `;

        generateCartFunction(10000);

    });

    afterEach(() => {
        testContainer.innerHTML = '';
    });

    it('displays cart on page', () => {

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

        expect(
            localStorage.setItem
        ).toHaveBeenCalledTimes(0);
        
    });

    it ('deletes item from cart and page', () => {

        const deleteButton = document.querySelector('.remove-item');

        deleteButton.click();

        expect(
            cart.length
        ).toEqual(0);

        expect(
            localStorage.setItem
        ).toHaveBeenCalledTimes(1);

        expect(
            localStorage.setItem
        ).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

});