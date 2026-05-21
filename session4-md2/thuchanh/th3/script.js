const image = document.getElementById('my-image')
const changeButton = document.getElementById('change-btn')

changeButton.addEventListener('click', function () {
    const currentSrc = image.getAttribute('src')

    console.log('Ảnh hiện tại:', currentSrc)

    image.setAttribute('src', 'https://picsum.photos/id/1025/300/200')
    image.setAttribute('alt', 'Ảnh sau khi thay đổi')

    console.log('Ảnh sau khi thay đổi:', image.getAttribute('src'))
})
