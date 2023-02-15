import { isNaN } from "lodash";

export interface ExitInterface {
  name: string,
  city: string,
  b: number,
  m: number,
  s: number,
  sort: number,
  freight: number,
  order: number,
  payment: string,
  single: boolean,
}

export class ExitItem {
  public readonly city: string;
  public readonly name: string;
  public readonly payment: string;
  public readonly b: number;
  public readonly m: number;
  public readonly s: number;
  public readonly freight: number;
  public readonly sort: number;
  public readonly single: boolean;
  public readonly order: number;
  public readonly hash: string;

  constructor(props: ExitInterface) {
    const { name, city, payment, order, s, m, b, freight, sort, single } = props;
    this.name = name;
    this.payment = payment;
    this.city = city;
    this.freight = freight;
    this.b = b;
    this.m = m;
    this.s = s;
    this.order = order;
    this.sort = sort;
    this.single = single;
    this.hash = new Date().getTime().toString();
  }

  isValid(): boolean | string {
    if (this.s < 0 || this.m < 0 || this.b < 0) {
      return 'nenhuma quantidade pode ser menor que zero';
    }
    if (this.s === 0 && this.m === 0 && this.b === 0) {
      return 'um produto tem de ser maior que zero';
    }
    if (
      this.payment.trim().length === 0 ||
      this.name.trim().length === 0 ||
      this.city.trim().length === 0
    ) {
      return 'forma de pagamento/nome/cidade nao pode ser vazio';
    }
    return true;
  }

  totalAmount() {
    const m = isNaN(this.m) ? 0 : this.m;
    const s = isNaN(this.s) ? 0 : this.s;
    const b = isNaN(this.b) ? 0 : this.b;
    return m + b + s;
  }

  copyWith(props: {
    name?: string;
    city?: string;
    b?: number;
    m?: number;
    s?: number;
    sort?: number;
    freight?: number;
    payment?: string;
    order?: number;
    single?: boolean;
  }) {
    const { name, city, order, payment, s, m, b, freight, sort, single } = props;
    return new ExitItem({
      name: name ?? this.name,
      city: city ?? this.city,
      b: b ?? this.b,
      m: m ?? this.m,
      s: s ?? this.s,
      order: order ?? this.order,
      sort: sort ?? this.sort,
      freight: freight ?? this.freight,
      payment: payment ?? this.payment,
      single: single ?? this.single,
    });
  }
}

