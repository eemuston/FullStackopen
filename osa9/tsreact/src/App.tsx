import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"
import { courseParts } from "./types"

const App = () => {
  const courseName = "Half Stack application development"
  return (
    <div>
      <Header coursename={courseName}/>
      <Content parts={courseParts}/>
      <Total parts={courseParts} />
    </div>
  )
}

export default App