import Product from "../model/Product";

export default class Get {
    all(): Product[] {
        return [
           new Product({model: "richard", type: "john", height: "190", id: 1, price: 200}),
           new Product({model: "Lester", type: "john", height: "190", id: 1, price: 2000}),
           new Product({model: "Jest", type: "john", height: "190", id: 1, price: 400}),
           new Product({model: "Machael", type: "john", height: "190", id: 1, price: 200}),
        ]
    }
}