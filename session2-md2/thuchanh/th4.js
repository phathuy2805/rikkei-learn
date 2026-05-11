let sum = 0
let input = Number(prompt('Nhap mot so (nhap 0 de dung):'))

while (input !== 0) {
    sum += input
    input = Number(prompt('Nhap tiep mot so (nhap 0 de dung):'))
}

console.log('Tong cac so da nhap:', sum)
