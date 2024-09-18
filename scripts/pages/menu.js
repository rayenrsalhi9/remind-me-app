import {handleDarkMode} from '../utils/darkMode.js';

handleDarkMode();

const options = document.querySelectorAll('.option');
options.forEach(option => {
    option.addEventListener('click', () => {
        window.location.href = `${option.dataset.link}`;
    });
});