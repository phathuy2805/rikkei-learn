function sumAllNumbers(...numbers) {
    let total = 0

    for (let number of numbers) {
        total += number
    }

    return total
}

const result1 = sumAllNumbers(1, 2, 3)
const result2 = sumAllNumbers(10, 20, 30, 40)
const result3 = sumAllNumbers(5, 15, 25, 35, 45)

console.log('Tổng bộ số thứ nhất:', result1)
console.log('Tổng bộ số thứ hai:', result2)
console.log('Tổng bộ số thứ ba:', result3)
