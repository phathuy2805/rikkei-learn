import { getUsers } from './apiService.js'

const userListElement = document.querySelector('#user-list')

async function renderUsers() {
    const users = await getUsers()

    const copiedUsers = [...users]

    const userHTML = copiedUsers
        .map(({ name, email, website }) => {
            return `
                <div class="user-card">
                    <h2>${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Website:</strong> ${website}</p>
                </div>
            `
        })
        .join('')

    userListElement.innerHTML = userHTML
}

renderUsers()
