import { OrderProduct } from "./Order";

interface AddOrderDataInterface {
  customer: number,
  products: OrderProduct[],
  freight: number,
  payment: number,
  transport: number,
  entry: number,
  discount: number,
  observation?: string,
  name?: string,
  port?: string
}

export class AddOrderData {
  public readonly customer: number;
    public readonly products: OrderProduct[];
    public readonly freight: number;
    public readonly payment: number;
    public readonly transport: number;
    public readonly entry: number;
    public readonly discount: number;
    public readonly observation?: string;
    public readonly name?: string;
    public readonly port?: string;

  constructor(props: AddOrderDataInterface) {
    const { customer, products, freight, payment, transport, entry, discount, observation, name, port } = props;
    this.customer = customer;
    this.products = products;
    this.freight = freight;
    this.payment = payment;
    this.transport = transport;
    this.entry = entry;
    this.discount = discount;
    this.observation = observation;
    this.name = name;
    this.port = port;
  }

  copyWith(props: {
    customer?: number,
    products?: OrderProduct[],
    freight?: number,
    payment?: number,
    transport?: number,
    entry?: number,
    discount?: number,
    observation?: string,
    name?: string,
    port?: string
  }) {
    const { customer, products, freight, payment, transport, entry, discount, observation, name, port } = props;
    return new AddOrderData({
      customer: customer ?? this.customer,
      products: products ?? this.products,
      freight: freight ?? this.freight,
      payment: payment ?? this.payment,
      transport: transport ?? this.transport,
      entry: entry ?? this.entry,
      discount: discount ?? this.discount,
      observation: observation ?? this.observation,
      name: name ?? this.name,
      port: port ?? this.port
    });
  }

  get productsTotalPrice(): number {
    return this.products.reduce((p, c) => p + (c.price * c.amount), 0);
  }

  get totalAmount(): number {
    return this.products.reduce((p, c) => p + c.amount, 0);
  }

  get orderTotalPrice(): number {
    return this.productsTotalPrice - this.discount - this.entry + this.freight;
  }
}
