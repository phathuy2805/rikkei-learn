class Car {
    brand: string
    year: number

    constructor(brand: string, year: number) {
        this.brand = brand
        this.year = year
    }

    getDetails(): void {
        console.log(`Car brand: ${this.brand}`)
        console.log(`Manufacture year: ${this.year}`)
    }
}

const car1 = new Car('Toyota', 2020)
const car2 = new Car('Honda', 2022)

car1.getDetails()
car2.getDetails()
