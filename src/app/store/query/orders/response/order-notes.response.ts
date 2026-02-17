export type OrderNotesResponse = OrderNote[];

export type OrderNote = {
    id: number;
    date: string;
    author: string;
    value: string;
}
