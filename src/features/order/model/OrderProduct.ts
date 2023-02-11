import Product from "../../products/model/Product";

export interface OrderProduct {
    hash: string,
    product: Product,
    amount: number,
    price: number
}
