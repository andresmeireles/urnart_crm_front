import { OrderData } from "./OrderData";

export class DBOrderData
{
  public readonly id: number;
  public readonly order: OrderData; 

  constructor(props: {id: number, order: OrderData}) {
    this.id = props.id;
    this.order = props.order
  }
}
