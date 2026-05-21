const randomNumber = Math.floor(Math.random() * 100) + 1

let isCorrect = false

console.log('Số bí mật là:', randomNumber)

for (let turn = 1; turn <= 5; turn++) {
    const guess = Number(
        prompt('Lần đoán thứ ' + turn + ': Nhập một số từ 1 đến 100'),
    )

    if (guess === randomNumber) {
        console.log('Chúc mừng! Bạn đã đoán đúng số bí mật.')
        alert('Chúc mừng! Bạn đã đoán đúng số bí mật.')
        isCorrect = true
        break
    } else if (guess > randomNumber) {
        console.log('Số bạn đoán quá lớn.')
        alert('Số bạn đoán quá lớn.')
    } else if (guess < randomNumber) {
        console.log('Số bạn đoán quá nhỏ.')
        alert('Số bạn đoán quá nhỏ.')
    } else {
        console.log('Dữ liệu không hợp lệ. Vui lòng nhập số.')
        alert('Dữ liệu không hợp lệ. Vui lòng nhập số.')
    }
}

if (!isCorrect) {
    console.log('Game Over! Bạn đã hết 5 lần đoán.')
    alert('Game Over! Bạn đã hết 5 lần đoán. Số đúng là: ' + randomNumber)
}
