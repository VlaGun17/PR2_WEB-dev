import type { Order, OrderStatus } from './types.ts';

export function updateOrderStatus(order: Order, newStatus: OrderStatus): Order {
    if(order.status === 'cancelled' || order.status === 'delivered') {
        throw new Error(`Cannot update status of an order that is already ${order.status}.`);
    }

    return {
        ...order,
        status: newStatus,
        updatedAt: new Date(),
    };
}

export function validateCustomerInput(input: unknown): string {
    if(typeof input !== 'string'){
        throw new Error("Invalid input: Expected a string.");
    }

    const trimmedInput = input.trim();

    if(trimmedInput === '' || !trimmedInput.includes('@')) {
        throw new Error("Invalid format for customer email.");
    }

    return trimmedInput;
}