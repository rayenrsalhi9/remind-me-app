export let history = JSON.parse(localStorage.getItem('history')) || [];

export function saveHistory() {
    localStorage.setItem('history', JSON.stringify(history));
}