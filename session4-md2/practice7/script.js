const registerForm = document.getElementById('register-form')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')

registerForm.addEventListener('submit', function (event) {
    event.preventDefault()

    const userData = {
        username: usernameInput.value,
        email: emailInput.value,
    }

    console.log(userData)
})
