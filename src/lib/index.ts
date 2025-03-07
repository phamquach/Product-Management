export function formatNumber(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function isNotNull(obj: object = {}): boolean {
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
}