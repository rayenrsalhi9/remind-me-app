import { cart } from '../../../scripts/utils/cart.js';

describe('test suite : cart', () => {

    const testContainer = document.querySelector('.test-container');

    afterEach(() => {
        testContainer.innerHTML = '';
    });

    it('renders cart correctly on page', () => {

        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    id: "iddf129b1720eca", 
                    name: "tk telecom", 
                    price: "1250"
                }
            ]);
        });

        testContainer.innerHTML = `
            <div class="cart-area"></div>
        `;

        cart.loadFromStorage();

        cart.render(10000);

        expect(
            cart.products.length
        ).toEqual(1);

        expect(
            document.querySelector('.id').innerText
        ).toContain(cart.products[0].id);

        expect(
            document.querySelector('.info .name').innerText
        ).toEqual('tk telecom');

        expect(
            document.querySelector('.info .price').innerText
        ).toEqual('1.250 TND')
    });
});