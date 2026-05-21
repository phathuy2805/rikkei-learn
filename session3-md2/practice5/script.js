let number
do {
    number = Number(prompt('Nhập một số từ 1 đến 10:'))
    if (isNaN(number) || number < 1 || number > 10) {
        alert('Vui lòng nhập một số hợp lệ từ 1 đến 10.')
    }
} while (isNaN(number) || number < 1 || number > 10)

alert(`Bạn đã nhập số: ${number}`)
console.log(`Số đã nhập: ${number}`)
