const prices = [100, 200, 300, 400]

const totalPrice = prices.reduce(function (total, price) {
    return total + price
}, 0)

const vat = totalPrice * 0.1
const finalPrice = totalPrice + vat

console.log('Mảng giá ban đầu:', prices)
console.log('Tổng giá chưa VAT:', totalPrice)
console.log('Thuế VAT 10%:', vat)
console.log('Tổng thanh toán cuối cùng:', finalPrice)
