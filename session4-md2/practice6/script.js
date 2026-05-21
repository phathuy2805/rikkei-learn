const itemList = document.getElementById('item-list')
const addButton = document.getElementById('add-btn')
const removeButton = document.getElementById('remove-btn')

addButton.addEventListener('click', function () {
    const newItem = document.createElement('li')
    newItem.textContent = 'New Item'

    itemList.appendChild(newItem)
})

removeButton.addEventListener('click', function () {
    const lastItem = itemList.lastElementChild

    if (lastItem) {
        lastItem.remove()
    } else {
        alert('Danh sách đang rỗng, không có phần tử để xóa.')
    }
})
