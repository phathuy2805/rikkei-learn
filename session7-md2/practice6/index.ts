enum OrderStatus {
    Pending = 'Pending',
    Shipped = 'Shipped',
    Delivered = 'Delivered',
}

class Order {
    public status: OrderStatus

    constructor(status: OrderStatus) {
        this.status = status
    }

    public checkStatus(): void {
        if (this.status === OrderStatus.Delivered) {
            console.log('Order finished')
        } else {
            console.log(`Order status: ${this.status}`)
        }
    }
}

const order1 = new Order(OrderStatus.Pending)
const order2 = new Order(OrderStatus.Shipped)
const order3 = new Order(OrderStatus.Delivered)

order1.checkStatus()
order2.checkStatus()
order3.checkStatus()
