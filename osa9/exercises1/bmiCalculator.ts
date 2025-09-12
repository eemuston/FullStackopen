interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, weight: number): string => {
    if (height == 0)
         throw new Error("Dividing with 0 is no good män!")
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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}