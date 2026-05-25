const numbers = [3, 7, 12, 20, 25, 30, 42]

function checkNumber(searchValue) {
    if (numbers.includes(searchValue)) {
        const index = numbers.indexOf(searchValue)
        console.log(searchValue + ' có trong mảng tại vị trí index: ' + index)
    } else {
        console.log('Not found')
    }
}

const inputNumber = Number(prompt('Nhập số cần tìm:'))

checkNumber(inputNumber)
