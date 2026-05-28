function identity<T>(arg: T): T {
    return arg
}

interface Box<T> {
    content: T
}

const stringValue = identity<string>('Hello TypeScript')
const numberValue = identity<number>(100)

const stringBox: Box<string> = {
    content: 'This is a string box',
}

const numberBox: Box<number> = {
    content: 999,
}

console.log('Kết quả identity với string:', stringValue)
console.log('Kết quả identity với number:', numberValue)

console.log('Box chứa string:', stringBox)
console.log('Box chứa number:', numberBox)
