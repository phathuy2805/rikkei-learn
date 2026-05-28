const oldHardware = ['CPU', 'RAM']
const newHardware = ['SSD', 'GPU']

const allHardware = [...oldHardware, ...newHardware]

const finalHardware = [...allHardware, 'Monitor']

console.log('Mảng oldHardware:', oldHardware)
console.log('Mảng newHardware:', newHardware)
console.log('Mảng allHardware:', allHardware)
console.log('Mảng sau khi thêm Monitor:', finalHardware)
