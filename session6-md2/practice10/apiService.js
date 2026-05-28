const API_URL = 'https://jsonplaceholder.typicode.com/users'

export async function getUsers() {
    try {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Không thể lấy dữ liệu người dùng')
        }

        const users = await response.json()

        return users
    } catch (error) {
        console.log('Lỗi khi gọi API:', error.message)
        return []
    }
}
