const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
    greet: function() {
      console.log('hello, my name is', this.name)
    },
    doAddition: function(a, b) {
        console.log(a + b)
    },
}

arto.greet()

arto.growOlder = function() {
    this.age += 1
}

console.log(arto.age)
arto.growOlder()
console.log(arto.age)

arto.doAddition(2, 4) 

const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)

console.log("**********************")

class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }
    greet() {
      console.log('hello, my name is', this.name)
    }
  }
  
  const arto1 = new Person('Arto Hellas', 35)
  arto1.greet()
  
  const juha = new Person('Juha Tauriainen', 48)
  juha.greet()