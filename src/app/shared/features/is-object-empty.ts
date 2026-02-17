export const isObjectEmpty = <T extends object>(item: T) => {
    return Object.keys(item).length === 0;
}