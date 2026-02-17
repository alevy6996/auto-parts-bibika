export default function isAnyItemNull(...args: unknown[]) {
    return !!args.find(item => !item);
}
