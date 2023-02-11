import Product from "../../products/model/Product";

export function getProducts() {
    return [
        new Product({ height: '190', id: 2, model: 'P2', price: 206, type: 'cv' }),
        new Product({ height: '170', id: 12, model: 'P2', price: 206, type: 'cv' }),
        new Product({ height: '180', id: 22, model: 'P2', price: 206, type: 'cv' }),
        new Product({ height: '160', id: 32, model: 'P2', price: 206, type: '' }),
        new Product({ height: '150', id: 42, model: 'P2', price: 206, type: '' }),
        new Product({ height: '130', id: 52, model: 'P2', price: 206, type: '' }),
    ]
}