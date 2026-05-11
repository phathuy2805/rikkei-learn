let numberA = 5
let stringB = '5'

const looseResult = numberA == stringB

const strictResult = numberA === stringB

console.log('--- So sanh == va === ---')
console.log('numberA =', numberA, '| kieu:', typeof numberA)
console.log('stringB =', stringB, '| kieu:', typeof stringB)
console.log('numberA == stringB  =>', looseResult)
console.log('numberA === stringB =>', strictResult)

const understood = confirm('Ban da hieu bai chua?')
console.log('Ket qua confirm:', understood)
