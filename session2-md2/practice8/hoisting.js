console.log('=== PHAN 1: Hoisting ===')
console.log('Gia tri message truoc khai bao:', message)

var message = 'Hello'

console.log('Gia tri message sau khai bao :', message)

console.log('')
console.log('=== PHAN 2: Hoisting voi let ===')

try {
    console.log('Gia tri count truoc khai bao:', count)
} catch (error) {
    console.log('Loi khi truy cap let truoc khai bao:', error.message)
}

let count = 10
console.log('Gia tri count sau khai bao:', count)

console.log('')
console.log('=== PHAN 3: Function Scope ===')

function greet() {
    var localMessage = 'Xin chao tu ben trong ham'
    console.log('Ben trong ham:', localMessage)
}

greet()

try {
    console.log('Ben ngoai ham:', localMessage)
} catch (error) {
    console.log('Loi khi truy cap bien cuc bo tu ngoai ham:', error.message)
}
