function simulateTask() {
    return new Promise(function (resolve, reject) {
        const isError = false

        setTimeout(function () {
            if (isError) {
                reject('Task Failed!')
            } else {
                resolve('Task Completed!')
            }
        }, 2000)
    })
}

simulateTask()
    .then(function (message) {
        console.log('Thành công:', message)
    })
    .catch(function (error) {
        console.log('Lỗi:', error)
    })
