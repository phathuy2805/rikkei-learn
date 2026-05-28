abstract class PaymentMethod {
    protected amount: number

    constructor(amount: number) {
        this.amount = amount
    }

    abstract processPayment(): void
}

class CreditCardPayment extends PaymentMethod {
    private cardNumber: string

    constructor(amount: number, cardNumber: string) {
        super(amount)
        this.cardNumber = cardNumber
    }

    public processPayment(): void {
        console.log(`Processing credit card payment of $${this.amount}`)
        console.log(
            `Paid by credit card ending with ${this.cardNumber.slice(-4)}`,
        )
    }
}

class PaypalPayment extends PaymentMethod {
    private email: string

    constructor(amount: number, email: string) {
        super(amount)
        this.email = email
    }

    public processPayment(): void {
        console.log(`Processing PayPal payment of $${this.amount}`)
        console.log(`Paid by PayPal account: ${this.email}`)
    }
}

const creditCardPayment = new CreditCardPayment(100, '1234567812345678')
const paypalPayment = new PaypalPayment(250, 'user@example.com')

creditCardPayment.processPayment()
paypalPayment.processPayment()
