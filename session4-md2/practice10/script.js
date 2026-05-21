const colors = ['red', 'blue', 'green', 'yellow', 'purple']

const changeButton = document.querySelector('#change-btn')
const colorName = document.querySelector('#color-name')

changeButton.addEventListener('click', function () {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const randomColor = colors[randomIndex]

    document.body.style.backgroundColor = randomColor
    colorName.textContent = randomColor

    console.log('Màu đang được áp dụng:', randomColor)
})
