export type CartOptionsResponse = {
    options: {
        disallow_new_shipment_address: 1 | 2;
        self_shipment: number;
        errors: Error[]
    }
}
