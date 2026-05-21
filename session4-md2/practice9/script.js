const parent = document.getElementById('parent')
const child = document.getElementById('child')

parent.addEventListener('click', function () {
    console.log('Sự kiện click của Parent được thực thi')
})

child.addEventListener('click', function (event) {
    event.stopPropagation()

    console.log('Sự kiện click của Child được thực thi')
})
