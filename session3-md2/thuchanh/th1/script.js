const number = Number(prompt('Nhập vào một số bất kỳ:'))

if (number > 0) {
    console.log('Số dương')
    alert('Số dương')
} else if (number < 0) {
    console.log('Số âm')
    alert('Số âm')
} else {
    console.log('Số không')
    alert('Số không')
}
