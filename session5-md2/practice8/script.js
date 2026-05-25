const ages = [15, 20, 12, 18, 25, 30, 10]

function getAdults(ageList) {
    const adults = ageList.filter((age) => age >= 18)

    return adults
}

const adultAges = getAdults(ages)

console.log('Mảng ban đầu:', ages)
console.log('Các độ tuổi từ 18 trở lên:', adultAges)
