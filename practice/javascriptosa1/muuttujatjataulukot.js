const x = 1
let y = 5

console.log(x, y)   // tulostuu 1 5
y += 10
console.log(x, y)   // tulostuu 1 15
y = 'teksti'
console.log(x, y)   // tulostuu 1 teksti
//x = 4               // aiheuttaa virheen

console.log("************")

const t = [1, -1, 3]

console.log(t.length) // tulostuu 3
console.log(t[2])     // tulostuu 3

t.push(7)             // lisätään taulukkoon luku 7

console.log(t.length) // tulostuu 4

t.forEach(value => {
  console.log(value)  // tulostuu 1, -1, 3, 7 omille riveilleen
})                    

console.log("************")

const t1 = [4, 3, 5]

const t2 = t1.concat(1)

const m1 = t1.map(value => value *3)

console.log(t1)
console.log(t2)
console.log(m1)

const m2 = t1.map(value => '<li>' + value + '</li>')
console.log(m2)

console.log("************")

const t3 = [1, 2, 3, 4, 5]

const [first, second, third, ...rest] = t3

console.log(first, second, third)  
console.log(rest)          