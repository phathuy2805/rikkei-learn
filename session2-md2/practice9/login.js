const ADMIN_USER = 'admin'
const ADMIN_PASS = '123456'

const inputUser = prompt('Nhap ten dang nhap:')
const inputPass = prompt('Nhap mat khau:')

const isUserCorrect = inputUser === ADMIN_USER
const isPassCorrect = inputPass === ADMIN_PASS
const isLoginSuccess = isUserCorrect && isPassCorrect

console.log('=== Ket qua dang nhap ===')
console.log('Ten dang nhap dung:', isUserCorrect)
console.log('Mat khau dung     :', isPassCorrect)
console.log('Dang nhap thanh cong:', isLoginSuccess)

if (isLoginSuccess) {
    alert('Dang nhap thanh cong! Chao mung ' + inputUser)
    console.log('=> DANG NHAP THANH CONG')
} else {
    alert('Dang nhap that bai! Ten dang nhap hoac mat khau khong dung.')
    console.log('=> DANG NHAP THAT BAI')
}
