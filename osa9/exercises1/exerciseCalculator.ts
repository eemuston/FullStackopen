interface DaysAndTarget{
    target: number
    days: Array<number>
}

const parseExerciseArguments = (args: Array<string>): DaysAndTarget => {
  if (args.length < 4) throw new Error('Not enough arguments')

  for (let i = 2; i < args.length; i++)
  {
    if (isNaN(Number(args[i])))
        throw new Error('Provided values were not numbers!')
  }
  return {
    target: Number(args[2]),
    days: args.slice(3).map(Number)
}
}

interface Result{
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}

const calculateExercises = (days: Array<number>, target: number): Result => {
    const trained = days.filter((day) => day > 0)
    const avg = days.reduce((a, c) => a + c, 0) / days.length
    const success = avg >= target

    let rating: number
    if (success == true)
        rating = 3
    else if (avg > target * 0.75)
        rating = 2
    else
        rating = 1

    let ratingDesc :string
    if (rating == 3)
        ratingDesc = "YOU REACHED THE TARGET! GOOD JOB!"
    else if (rating == 2)
        ratingDesc = "not quite there, but not too bad."
    else if (rating == 1)
        ratingDesc = "Can you even try please. Honestly bad job."

    const result: Result = {
        periodLength: days.length,
        trainingDays: trained.length,
        success: success,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: avg
    }
    return result
}

try {
  const { target, days } = parseExerciseArguments(process.argv)
  console.log(calculateExercises(days, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}