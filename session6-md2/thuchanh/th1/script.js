const productName = 'Laptop'
const productPrice = 500
const quantity = 2

const message = `
You bought ${quantity} units of ${productName} for a total of $${productPrice * quantity}
            `.trim()

console.log(message)
