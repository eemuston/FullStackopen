interface coursePart {
    name: string,
    exerciseCount: number
}

interface Part {
    part: coursePart
}

const Content = (props: Part) => {
    return <p>{props.part.name} {props.part.exerciseCount}</p>
}

export default Content