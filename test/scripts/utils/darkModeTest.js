import { darkModeOn, handleDarkMode } from "../../../scripts/utils/darkMode.js";

describe('test unit: darkMode', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => 'false');

        const testContainer = document.querySelector('.test-container');
        testContainer.innerHTML = `
            <div class="dark-mode-container">
                <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-moon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z"/></svg>
            </div>
        `;
    
    })

    it ('initializes light mode', () => {
        const icon = document.querySelector('.icon');
        handleDarkMode();
        expect(darkModeOn).toEqual(false);
        expect(icon.classList).not.toContain('clicked');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    
});