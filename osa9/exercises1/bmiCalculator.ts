interface BmiValues {
  height: number;
  weight: number;
}

interface Response {
  height: number;
  weight: number;
  bmi: string;
}

interface BmiQuery {
  height?: string;
  weight?: string;
}

const parseQueryArgmunets = (query: BmiQuery): BmiValues => {
  const {height, weight} = query;
  if  (!height || !weight)
    throw new Error("Some parameters are missing, height and weight are required!");

  if (isNaN(Number(height)) || isNaN(Number(weight)))
    throw new Error('Provided parameters were not numbers');

  return {
    height: Number(height),
    weight: Number(weight)
  };
};

const parseArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string | Response => {
    if (height == 0)
         throw new Error("Dividing with 0 is no good män!");
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const formatted = Math.round(bmi * 100) / 100;

    let range: string;
    if (bmi < 18.6)
        range = "Underweight";
    else if(bmi < 25)
        range = "Normal";
    else if(bmi < 30)
        range = "Overweight";
    else if(bmi < 35)
        range = "Obese";
    else
        range = "Extremely obese";
    if (require.main === module)
      return `BMI with height of ${height} and weight of ${weight} is ${formatted}, which is in the ${range} range.`;
    else {
      return {
      height: height,
      weight: weight,
      bmi: `${range} range`
    };
    }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi, parseQueryArgmunets };