import { OrderProduct } from "./OrderProduct";

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

export class OrderData {
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
    return new OrderData({
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

  get isValid(): boolean | string {
    if (this.customer === 0) return 'cliente precisa ser preenchido';
    if (this.payment === 0) return 'cliente precisa um forma de pagento definida';
    if (this.products.length === 0) return 'não ha produtos cadastrados no pedido';
    if (this.transport === 0) return 'pedido não tem meio de entrega deifnido em transporte';
    if (this.transport > 1 && this.name === undefined) return 'entregas precisa de um resposavel para entrega';
    if (this.transport > 2 && this.name!.trim().length === 0) return 'nome de quem ira fazer a entrega não pode ser vazio';
    if (this.transport > 3 && this.port === undefined) return 'entregas em porto precisam ter o nome do porto definido';
    if (this.transport > 3 && this.port!.trim().length === 0) return 'porto precisa ser preenchido';
    return true;
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