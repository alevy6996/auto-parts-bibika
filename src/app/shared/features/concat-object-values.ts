export const concatValues = <T extends object>(item: T, excludeKeys: (keyof T)[]) => {
    return Array.from(Object.entries(item))
        .reduce((prev, [key, value], index, array) => {
            if ((excludeKeys as string[]).includes(key))
                return prev;
            else if (index === array.length - 1) {
                return prev + value;
            }
            return prev + value + ', ';
        }, '');
};