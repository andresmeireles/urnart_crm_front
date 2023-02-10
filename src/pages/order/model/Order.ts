import Product from "../../products/model/Product";

export interface PaymentType {label: string, code: number}

export const paymentTypeList: PaymentType[] = [
    {label: 'boleto', code: 1},
    {label: 'a vista', code: 2},
    {label: 'nota promissória', code: 3},
]

export interface TransportType {
    label: string, code: number
}

export const transportTypeList: TransportType[] = [
    {label: 'Cliente vai buscar', code: 1},
    {label: 'Empresa vai entregar', code: 2},
    {label: 'Terceirizado', code: 3},
    {label: 'Porto', code: 4},
]

export interface OrderProduct {
    hash: string,
    product: Product,
    amount: number,
    price: number
}
