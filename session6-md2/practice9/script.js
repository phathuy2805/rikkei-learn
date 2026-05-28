async function getUsers() {
    try {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/users',
        )

        const users = await response.json()

        const userNames = users.map(function (user) {
            return user.name
        })

        console.log('Danh sách tên người dùng:', userNames)
    } catch (error) {
        console.log('Có lỗi xảy ra:', error)
    }
}

getUsers()
