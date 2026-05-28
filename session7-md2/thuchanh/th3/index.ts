let result: string | number

result = 'Success'
console.log('Result dạng string:', result)

result = 200
console.log('Result dạng number:', result)

const httpResponse: [number, string] = [404, 'Not Found']

console.log('HTTP status code:', httpResponse[0])
console.log('HTTP message:', httpResponse[1])
console.log('HTTP response:', httpResponse)
