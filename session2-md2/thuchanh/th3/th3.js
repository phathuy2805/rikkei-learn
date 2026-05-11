const choice = Number(
    prompt(
        'Menu do uong:\n' +
            '1. Cafe\n' +
            '2. Cam vat\n' +
            '3. Tra sua\n' +
            '4. Coca\n\n' +
            'Nhap so thu tu mon ban muon chon:',
    ),
)

switch (choice) {
    case 1:
        console.log('Ban da chon: Cafe')
        break
    case 2:
        console.log('Ban da chon: Cam vat')
        break
    case 3:
        console.log('Ban da chon: Tra sua')
        break
    case 4:
        console.log('Ban da chon: Coca')
        break
    default:
        console.log('Mon uong khong ton tai')
}
