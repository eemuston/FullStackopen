import type { CoursePart } from "../types"

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em>
        </p>
      )
    case "group":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          Project exercises: {part.groupProjectCount}
        </p>
      )
    case "background":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
        </p>
      )
    case "special":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          Required skills: {part.requirements.join(", ")}
        </p>
      )
    default:
      const check: never = part
      return check
  }
}

export default Part