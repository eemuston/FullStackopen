interface coursePart {
    name: string,
    exerciseCount: number
}

interface Parts {
    parts: coursePart[]
}

const Total = (props: Parts) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
      <p>
        Number of exercises {totalExercises}
      </p>
    )
}

export default Total