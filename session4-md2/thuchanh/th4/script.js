const box = document.getElementById('box')
const toggleButton = document.getElementById('toggle-btn')

toggleButton.addEventListener('click', function () {
    box.classList.toggle('highlight')
})
