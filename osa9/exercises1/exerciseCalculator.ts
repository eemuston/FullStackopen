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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))