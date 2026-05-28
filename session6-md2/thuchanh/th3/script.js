const userProfile = {
    username: 'Nguyen Huy',
    age: 22,
    email: 'huy@example.com',
    address: {
        city: 'Ho Chi Minh City',
    },
}

const {
    username: fullName,
    address: { city },
} = userProfile

console.log('Full name:', fullName)
console.log('City:', city)
