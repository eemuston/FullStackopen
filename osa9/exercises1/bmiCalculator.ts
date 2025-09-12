const calculateBmi = (height: number, weight: number): string => {
    if (height == 0)
        return ("Dividing with 0 is no good män!")
    const heightMeters = height / 100
    const bmi = weight / (heightMeters * heightMeters)
    const formatted = Math.round(bmi * 100) / 100

    let range: string
    if (bmi < 18.6)
        range = "underweight"
    else if(bmi < 25)
        range = "normal"
    else if(bmi < 30)
        range = "overweight"
    else if(bmi < 35)
        range = "obese"
    else
        range = "extremely obese"
    return `BMI with height of ${height} and weight of ${weight} is ${formatted}, which is in the ${range} range.`
}

console.log(calculateBmi(0, 85))