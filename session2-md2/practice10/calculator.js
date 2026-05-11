const numA = Number(prompt('Nhap so thu nhat (A):'))
const numB = Number(prompt('Nhap so thu hai (B):'))
const operator = prompt('Nhap phep tinh (+, -, *, /):')

let result
let isValid = true

if (operator === '+') {
    result = numA + numB
} else if (operator === '-') {
    result = numA - numB
} else if (operator === '*') {
    result = numA * numB
} else if (operator === '/') {
    if (numB === 0) {
        isValid = false
        alert('Loi: Khong the chia cho 0!')
        console.log('Loi: Khong the chia cho 0!')
    } else {
        result = numA / numB
    }
} else {
    isValid = false
    alert('Loi: Phep tinh khong hop le! Chi chap nhan +, -, *, /')
    console.log('Loi: Phep tinh khong hop le:', operator)
}

if (isValid) {
    const output =
        'Ket qua cua ' + numA + ' ' + operator + ' ' + numB + ' la: ' + result
    console.log(output)
    alert(output)
}
