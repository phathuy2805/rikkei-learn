const choice = Number(
    prompt(
        'MENU ĐỒ UỐNG\n' +
            '1. Cafe\n' +
            '2. Cam vắt\n' +
            '3. Trà sữa\n' +
            '4. Coca\n\n' +
            'Nhập số thứ tự món bạn muốn chọn:',
    ),
)

switch (choice) {
    case 1:
        console.log('Bạn đã chọn: Cafe')
        alert('Bạn đã chọn: Cafe')
        break

    case 2:
        console.log('Bạn đã chọn: Cam vắt')
        alert('Bạn đã chọn: Cam vắt')
        break

    case 3:
        console.log('Bạn đã chọn: Trà sữa')
        alert('Bạn đã chọn: Trà sữa')
        break

    case 4:
        console.log('Bạn đã chọn: Coca')
        alert('Bạn đã chọn: Coca')
        break

    default:
        console.log('Món ăn không tồn tại')
        alert('Món ăn không tồn tại')
        break
}
