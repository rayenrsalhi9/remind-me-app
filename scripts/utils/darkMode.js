export let darkModeOn = JSON.parse(localStorage.getItem('darkMode')) || false;

export function handleDarkMode() {
    
    const iconContainer = document.querySelector('.dark-mode-container');
    const icon = document.querySelector('svg.icon');

    initializeAppearance();

    icon.addEventListener('click', () => {

        darkModeOn = !darkModeOn;
        localStorage.setItem('darkMode', JSON.stringify(darkModeOn));

        initializeAppearance();
    });

    function initializeAppearance() {

        if (darkModeOn === true) {

            icon.classList.add('clicked');
            iconContainer.classList.add('clicked');
    
            document.documentElement.style.setProperty('--dark-color', '#faf5e9');
            document.documentElement.style.setProperty('--light-color', '#111111');

        } else {

            icon.classList.remove('clicked');
            iconContainer.classList.remove('clicked');
    
            document.documentElement.style.setProperty('--dark-color', '#111111');
            document.documentElement.style.setProperty('--light-color', '#faf5e9');

        }
    
    }
    
}