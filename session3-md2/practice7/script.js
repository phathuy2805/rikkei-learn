let salary = Number(prompt('Nhập số tiền lương của bạn theo triệu đồng:'))
let age = Number(prompt('Nhập độ tuổi của bạn:'))
let badDebt = prompt('Bạn có nợ xấu không? Nhập Yes hoặc No:')

badDebt = badDebt.toLowerCase()

let CanDebt = salary > 15 && age >= 18 && age <= 60 && badDebt === 'no'

if (CanDebt) {
    console.log('Bạn đủ điều kiện vay vốn.')
    alert('Bạn đủ điều kiện vay vốn.')
} else {
    console.log('Bạn không đủ điều kiện vay vốn.')
    alert('Bạn không đủ điều kiện vay vốn.')
}
