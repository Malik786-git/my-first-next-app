import { IProductResponse } from "../api/response/product.response";

export class Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    price_label: string;
    constructor(data: IProductResponse) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.desc;
        this.image = data.img;
        this.price = data.price;
        this.price_label = this.formatProductPrice(this.price);
    }

    private formatProductPrice(price: number = 0, symbol: string = "Rs"): string {
        let str_number: string = (price).toFixed(2);
        let parts: string[] = str_number.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return `${symbol} ${parts.join(".")}`.trim();
    }
}