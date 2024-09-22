import {dinarFormat} from '../../../scripts/utils/dinarFormat.js';


describe('Test unit: dinarFormat', () => {

    it('formats a basic value', () => {
        expect(
            dinarFormat(20000)
        ).toEqual('20.000 TND');
    });

    it('formats a 0 value', () => {
        expect(
            dinarFormat(0)
        ).toEqual('0.000 TND');
    });

    it('formats a tricky value (or an edge value)', () => {
        expect(
            dinarFormat(12250)
        ).toEqual('12.250 TND');
    })
});