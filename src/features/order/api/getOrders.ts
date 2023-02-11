import { Customer} from "../../customers/model/Customer";
import { paymentTypeList, transportTypeList } from "../model/InsertOrder";
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

interface DisplayOrder {
  id: number,
  customer: Customer,
  payment: string,
  transport: string,
  freight: number,
  name?: string,
  port?: string
  orderTotalPrice: number,
  totalAmount: number,
  createdAt: Date,
  updatedAt: Date,
  mode: number,
}

// TODO: implement
export default function getOrders(): DisplayOrder[] {
  return [
    convertOrder(new OrderData({
      id: 1,
      name: "Cara maluco",
      port: undefined,
      customer: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      freight: 200,
      transport: 2,
      payment: 3,
      products: [],
      discount: 200,
      entry: 300,
    })),
  ];
}

function convertOrder(order: OrderData): DisplayOrder {
  const {id, mode, name, port, customer, freight, transport, payment, createdAt, updatedAt, orderTotalPrice, totalAmount } = order;
  return {
    id: id!,
    customer: getCustomer(customer),
    freight,
    payment: getPayment(payment),
    transport: getTransport(transport),
    name,
    port,
    orderTotalPrice,
    totalAmount,
    createdAt,
    updatedAt,
    mode
  }
}

function getCustomer(id: number): Customer {
  return {
    id: id,
    code: id,
    tradeName: `cliente ${id}`,
    companyName: `compania ${id}`
  } 
}

function getPayment(code: number): string {
  const payment = paymentTypeList.find((pt) => pt.code === code);
  if (payment === undefined) {
    return 'pagamento inserido incorretamente';
  }
  return payment.label
}

function getTransport(code: number): string {
  const transport = transportTypeList.find((tp) => tp.code === code);
  if (transport === undefined) {
    return 'transporte mal definido';
  }
  return transport.label
}
