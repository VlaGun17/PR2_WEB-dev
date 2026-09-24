import type { CartItem, Order, PaymentDetails} from "./types.js";
import { createProduct, calculateLineTotal } from "./catalog.js";
import { updateOrderStatus, validateCustomerInput } from "./orders.js";
import { maskCardNumber, processPayment } from "./payments.js";

console.log("=== СИСТЕМА ОБРОБКИ ЗАМОВЛЕНЬ (E-COMMERCE CORE - ОНЛАЙН-АПТЕКА) ===\n");

const rawCustomerEmail = "  customer@pharmacy.com  ";
const validatedEmail = validateCustomerInput(rawCustomerEmail);

console.log("[Каталог товарів]");

const product1 = createProduct({
    id: "med-101",
    title: "Парацетамол Екстра",
    price: 120,
    description: "Знеболювальний та жарознижувальний засіб",
    tags: ["знеболювальне", "жарознижувальне", "аптечка"],
    inStock: true,
    dosageMg: 500,
    isPrescriptionRequired: false,
    expirationDate: "2027-05-01"
});

const product2 = createProduct({
    id: "med-202",
    title: "Амоксицилін Таблетки",
    price: 350,
    description: "Антибіотик широкого спектра дії",
    tags: ["антибіотики", "рецептурне"],
    inStock: true,
    dosageMg: 875,
    isPrescriptionRequired: true,
    expirationDate: "2026-11-15"
});

console.log(`- Створено товар #1: [${product1.title}] - ${product1.price} грн (Рецепт: ${product1.isPrescriptionRequired ? 'Так' : 'Ні'})`);
console.log(`  Специфікації: Дозування: ${product1.dosageMg} мг, Придатен до: ${product1.expirationDate}`);
console.log(`- Створено товар #2: [${product2.title}] - ${product2.price} грн (Рецепт: ${product2.isPrescriptionRequired ? 'Так' : 'Ні'})`);
console.log(`  Специфікації: Дозування: ${product2.dosageMg} мг, Придатен до: ${product2.expirationDate}\n`);

console.log("[Формування кошика]");

const cartItem1: CartItem = { product: product1, quantity: 2 }; // 120 * 2 = 240
const cartItem2: CartItem = { product: product2, quantity: 1 }; // 350 * 1 = 350

const line1Total = calculateLineTotal(cartItem1.product.price, cartItem1.quantity);
const line2Total = calculateLineTotal(cartItem2.product.price, cartItem2.quantity, 10); // 10% знижки

console.log(`1. ${cartItem1.product.title} x ${cartItem1.quantity} = ${line1Total} грн`);
console.log(`2. ${cartItem2.product.title} x ${cartItem2.quantity} (Знижка 10%) = ${line2Total} грн`);

const grandTotal = line1Total + line2Total;
console.log(`Загальна вартість замовлення: ${grandTotal} грн\n`);

console.log("[Створення замовлення]");

const initialDate = new Date();

let myOrder: Order = {
    orderId: "ord-pharm-98214",
    customerEmail: validatedEmail,
    items: [cartItem1, cartItem2],
    status: 'pending',
    delivery: 'certified_courier',
    createdAt: initialDate,
    updatedAt: initialDate
};

console.log(`Замовлення ID: ${myOrder.orderId}`);
console.log(`Клієнт: ${myOrder.customerEmail}`);
console.log(`Доставка: ${myOrder.delivery}`);
console.log(`Початковий статус: ${myOrder.status}`);
console.log(`Час створення: ${myOrder.createdAt.toISOString()}\n`);

console.log("[Зміна життєвого циклу]");

myOrder = updateOrderStatus(myOrder, 'processing');
console.log(`Оновлення статусу: pending -> ${myOrder.status} (Оновлено: ${myOrder.updatedAt.toISOString()})`);

myOrder = updateOrderStatus(myOrder, 'shipped');
console.log(`Оновлення статусу: processing -> ${myOrder.status} (Оновлено: ${myOrder.updatedAt.toISOString()})\n`);

console.log("[Процесинг платежу]");

const cardPayment: PaymentDetails = {
    type: 'card',
    cardNumber: "4149490012348821",
    cardHolder: "Іван Іванов",
    cvv: "777"
};

console.log(`Метод оплати: ${cardPayment.type}`);
console.log(`Маскування: ${maskCardNumber(cardPayment)}`);
console.log(`Результат: ${processPayment(cardPayment, grandTotal)}`);