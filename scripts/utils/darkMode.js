export function handleDarkMode() {
    const iconContainer = document.querySelector('.dark-mode-container');
    const icon = document.querySelector('svg');

    icon.addEventListener('click', () => {

        if (icon.classList.contains('clicked') && iconContainer.classList.contains('clicked')) {

            icon.classList.remove('clicked');
            iconContainer.classList.remove('clicked');

            document.documentElement.style.setProperty('--dark-color', '#111111');
            document.documentElement.style.setProperty('--light-color', '#faf5e9');

        } else {

            icon.classList.add('clicked');
            iconContainer.classList.add('clicked');

            document.documentElement.style.setProperty('--dark-color', '#faf5e9');
            document.documentElement.style.setProperty('--light-color', '#111111');

        }
    });
}