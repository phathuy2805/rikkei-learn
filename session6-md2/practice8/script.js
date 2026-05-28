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

async function runTask() {
    try {
        const result = await simulateTask()

        console.log('Thành công:', result)
    } catch (error) {
        console.log('Lỗi:', error)
    }
}

runTask()
