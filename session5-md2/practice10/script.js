const tasks = []

function addTask(title) {
    tasks.push(title)
    console.log('Đã thêm công việc:', title)
}

function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        const removedTask = tasks.splice(index, 1)
        console.log('Đã xóa công việc:', removedTask[0])
    } else {
        console.log('Vị trí không hợp lệ')
    }
}

function displayTasks() {
    console.log('Danh sách công việc:')

    if (tasks.length === 0) {
        console.log('Không có công việc nào.')
        return
    }

    tasks.forEach(function (task, index) {
        console.log(index + 1 + '. ' + task)
    })
}

addTask('Học JavaScript')
addTask('Làm bài tập Todo List')
addTask('Đưa code lên GitHub')

displayTasks()

removeTask(1)

displayTasks()
