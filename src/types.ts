export type EntityId = string | number;

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type DeliveryMethod = 'certified_courier' | 'pharmacy_pickup';

export type PaymentDetails = CreditCardPayment | CashOnDeliveryPayment | OnlineServicePayment;

export type TimestampMetadata = {
    readonly createdAt: Date;
    updatedAt: Date;
}

export type Order = {
    readonly orderId: string;
    customerEmail: string;
    items: CartItem[];
    status: OrderStatus;
    delivery: DeliveryMethod;
} & TimestampMetadata;

export type CreditCardPayment = {
    type: 'card';
    cardNumber: string;
    cardHolder: string;
    cvv: string;
}

export type CashOnDeliveryPayment = {
    type: 'cash';
    cashAmountToPay: number;
}

export type OnlineServicePayment = {
    type: 'online_service';
    serviceName: 'ApplePay' | 'GooglePay';
    transactionRef:string;
}

export interface BaseProduct {
    readonly id: EntityId;
    title: string;
    price: number;
    description?: string;
    tags: string[];
    inStock: boolean;
}

export interface Product extends BaseProduct {
    dosageMg: number;
    isPrescriptionRequired: boolean;
    expirationDate: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
}