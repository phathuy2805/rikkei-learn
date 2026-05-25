const scores = [1, 2, 3, 4, 5]

console.log('Bình phương của từng phần tử:')

scores.forEach(function (score) {
    const square = score * score
    console.log(square)
})

const doubledScores = scores.map(function (score) {
    return score * 2
})

console.log('Mảng ban đầu:', scores)
console.log('Mảng doubledScores:', doubledScores)
