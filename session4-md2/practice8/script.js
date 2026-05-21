const deleteButtons = document.querySelectorAll('.delete-btn')

deleteButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
        const liElement = event.target.parentElement

        liElement.remove()
    })
})
