class Animal {
    public name: string

    constructor(name: string) {
        this.name = name
    }

    public makeSound(): void {
        console.log(`${this.name} is making a sound`)
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name)
    }

    public makeSound(): void {
        console.log(`${this.name} says: Woof woof!`)
    }
}

const animal = new Animal('Animal')
animal.makeSound()

const dog = new Dog('Buddy')
dog.makeSound()
