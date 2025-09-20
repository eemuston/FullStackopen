import Part from "./Part"
import type { CoursePart } from "../types"

interface ContentProps {
  parts: CoursePart[]
}

const Content = ({ parts }: ContentProps) => {
  return (
    <div>
      {parts.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  )
}
export default Content