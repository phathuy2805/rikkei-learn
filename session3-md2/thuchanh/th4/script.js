let sum = 0
let number = Number(prompt('Nhập một số bất kỳ. Nhập 0 để dừng:'))

while (number !== 0) {
    sum += number
    number = Number(prompt('Nhập tiếp một số. Nhập 0 để dừng:'))
}

console.log('Tổng cuối cùng là:', sum)
alert('Tổng cuối cùng là: ' + sum)
