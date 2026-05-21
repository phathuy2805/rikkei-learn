let width = Number(prompt('Nhập chiều rộng của hình chữ nhật:'))
let height = Number(prompt('Nhập chiều cao của hình chữ nhật:'))

let result = ''

for (let i = 1; i <= height; i++) {
    for (let j = 1; j <= width; j++) {
        result += '* '
    }
    result += '\n'
}

console.log(result)
