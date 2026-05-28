class Employee {
    public name: string
    private salary: number

    constructor(name: string, salary: number) {
        this.name = name
        this.salary = salary
    }

    public showInfo(): void {
        console.log(`Employee name: ${this.name}`)
        console.log(`Salary: ${this.salary}`)
    }
}

const employee = new Employee('Nguyen Huy', 15000000)

console.log('Tên nhân viên:', employee.name)

employee.showInfo()

// Dòng dưới đây sẽ bị lỗi vì salary là private
// console.log(employee.salary)
