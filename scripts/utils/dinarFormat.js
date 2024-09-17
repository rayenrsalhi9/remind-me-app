export function dinarFormat(price) {
    return `${(price / 1000).toFixed(3)} TND`;
}