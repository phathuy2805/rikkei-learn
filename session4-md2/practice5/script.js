const userInput = document.getElementById('user-input')
const result = document.getElementById('result')

userInput.addEventListener('keydown', function (event) {
    result.textContent = 'Phím bạn vừa nhấn là: ' + event.key
})
