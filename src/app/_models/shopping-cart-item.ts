export class ShoppingCartItem {
    _id: string;
    title: string;
    category: string;
    imageUrl: string;
    quantity: number;
    price: number;

    constructor({ _id, title, category, imageUrl, quantity, price }) {
        this._id = _id;
        this.title = title;
        this.category = category;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.price = price;
    }

    get totalPrice() {
        return this.price * this.quantity;
    };
}