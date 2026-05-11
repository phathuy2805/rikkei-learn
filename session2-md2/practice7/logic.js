const attendance = Number(prompt('Nhap ty le chuyen can cua ban (%):'))
const gpa = Number(prompt('Nhap diem trung binh cua ban:'))
const hasSpecialPermit = confirm('Ban co giay phep dac biet khong?')

const meetsAcademicRequirement = attendance > 80 && gpa >= 5
const canTakeExam = meetsAcademicRequirement || hasSpecialPermit

console.log('=== Thong tin dau vao ===')
console.log('Chuyen can    :', attendance + '%')
console.log('Diem trung binh:', gpa)
console.log('Giay phep dac biet:', hasSpecialPermit)

console.log('=== Ket qua xu ly ===')
console.log('Chuyen can > 80% VA DTB >= 5 :', meetsAcademicRequirement)
console.log('Duoc du thi                  :', canTakeExam)

console.log('=== Ket luan ===')
if (canTakeExam) {
    console.log('=> DUOC DU THI')
} else {
    console.log('=> KHONG DUOC DU THI')
}
