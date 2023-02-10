import { Customer, Customer } from "../../customers/model/Customer";
import { OrderData } from "../model/OrderData";
import { OrderProduct } from "../model/OrderProduct";

interface ReadableOrder {
  id: number,
  customer: Customer,
  payment: string,
  transport: string,
  products: OrderProduct[],
  freight: number,
  entry: number,
  discount: number,
  observation?: string,
  name?: string,
  port?: string
}

// TODO: implement
export default function getOrders(): ReadableOrder[] {
  return [
  ];
}

async function convertOrders(order: OrderData): ReadableOrder {
  const {id, customer, } = order;
  return {
    id: id,
    customer: 
  }
}

function getCustomer(id: number): Customer {
  return {
    id: id,
    code: id,
    tradName: `cliente ${id}`,
    companyName: `compania ${id}`
  } 
}
