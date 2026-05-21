const n = Number(prompt('Nhập vào một số nguyên dương n:'))

console.log('Các số chẵn từ 1 đến ' + n + ' là:')

for (let i = 1; i <= n; i++) {
    if (i % 2 === 0) {
        console.log(i)
    }
}
