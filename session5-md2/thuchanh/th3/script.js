const students = []

students.push('Tao')
students.push('Mày')
students.push('Nó')

console.log('Sau khi thêm 3 sinh viên vào cuối mảng:', students)

students.unshift('Thằng Kia')

console.log('Sau khi thêm 1 sinh viên vào đầu mảng:', students)

const removedStudent = students.pop()

console.log('Sinh viên cuối cùng bị xóa:', removedStudent)
console.log('Mảng hiện tại:', students)
