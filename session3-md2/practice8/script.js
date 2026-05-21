let total = 0
let numbers = []

for (let i = 1; i <= 50; i++) {
    if (i % 5 === 0) {
        continue
    }

    numbers.push(i)
    total += i

    if (total > 200) {
        break
    }
}

console.log('Danh sách số thỏa mãn:', numbers)
console.log('Tổng cuối cùng:', total)
