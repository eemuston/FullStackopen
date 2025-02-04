const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
    'motto is': 'Hello World',
}

const object2 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
}

const object3 = {
    name: {
        first: 'Juha',
        last: 'Tauriainen',
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
}

console.log(object3.name.first)

console.log("*****************")

console.log(object1.name)
const fieldName = 'size'
console.log(object2[fieldName])

console.log("*****************")

object1.address = 'Tapiola'
object1['secret number'] = 12341
object1['secretnumber'] = 12341

console.log(object1)

console.log("*****************")

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
  }

console.log(sum(1, 5))

console.log("*****************")

const square = p => {
    console.log(p)
    return p * p
  }

const square1 = p => p * p

console.log(square(4))
console.log(square1(4))

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)

console.log(tSquared)

function product(a, b) {
    return a * b
  }
  
const vastaus = product(2, 6)

console.log(vastaus)

const average = function(a, b) {
    return (a + b) / 2
  }
  
const vastaus1 = average(2, 5)

console.log(vastaus1)