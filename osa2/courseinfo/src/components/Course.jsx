const Course = ({course}) => {
    return (
      <div>
        <Name course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
}

const Name = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
const Content = ({ parts }) => {
    return (
        <div>
        {parts.map(part => 
            <Part key={part.id} part={part} />
        )}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <b>total of {total} exercises</b>
    )
}

const Part = ({ part }) => {
    return(
    <p>{part.name} {part.exercises}</p>
    )
}

export default Course