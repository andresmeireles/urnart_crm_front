interface ProductInterface {
    id: number,
    model: string,
    type: string,
    height: string,
    price: number,
    color?: string,
    spec?: string
}

export default class Product {
    public readonly id: number;
    public readonly model: string;
    public readonly type: string;
    public readonly height: string;
    public readonly price: number;
    public readonly color?: string;
    public readonly spec?: string;
    
    constructor(props: ProductInterface) {
        this.id = props.id;
        this.model = props.model;
        this.type = props.type;
        this.height = props.height;
        this.price = props.price;
        this.color = props.color ?? '';
        this.spec = props.spec ?? '';
    }

    get name(): string {
        let name = `${this.model} ${this.type} ${this.height} ${this.spec ?? ''} ${this.color ?? ''}`;
        name = name.replaceAll("  ", " ");
        return name.trim();
    }

    get formattedPrice(): string {
        return Intl.NumberFormat(
            'pt-BR', 
            {
                style: "currency",
                currency: 'BRL',
            }
        ).format(this.price);
    }
}