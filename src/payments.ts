import type { PaymentDetails, CreditCardPayment } from './types.ts';

export function isCreditCardPayment(payment: PaymentDetails): payment is CreditCardPayment {
    if(payment.type === 'card') {
        return true;
    }
    return false;
}

export function maskCardNumber(payment: PaymentDetails): string {
    if(!isCreditCardPayment(payment)) {
        throw new Error("Not masking required.");
    }

    const lastFourDigits = payment.cardNumber.slice(-4);
    return "**** **** **** " + lastFourDigits;
}

export function processPayment(payment: PaymentDetails, amount: number): string {
    switch(payment.type) {
        case 'card':
            return `Processed credit card payment of $${amount.toFixed(2)}.`;
        case 'cash': {
            if(payment.cashAmountToPay > amount) {
                let balance = payment.cashAmountToPay - amount;
                return `Processed cash on delivery payment of $${amount.toFixed(2)}. Change to return: $${balance.toFixed(2)}.`;
            }
            return `Processed cash on delivery payment of $${amount.toFixed(2)}.`; 
        }
        case 'online_service':
            return `Processed online service payment of $${amount.toFixed(2)} via ${payment.serviceName}.`; 
        default: {
        const _exhaustiveCheck: never = payment;
        throw new Error(`Unhandled payment type: ${_exhaustiveCheck}`);
        }   
    }
}