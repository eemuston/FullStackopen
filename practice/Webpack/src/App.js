import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then(response => setResources(response.data))
  }, [baseUrl])


  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    setResources(resources.concat(response.data))
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])
  const [notes, noteService] = useResource(BACKEND_URL)
  const [newNote, setNewNote] = useState('')

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }


  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const createNote = (event) => {
    event.preventDefault()
    noteService.create({content: newNote, important: true})
    setNewNote('')
  }

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick} >press</button>
      <div>{notes.length} notes on server {BACKEND_URL}</div>
      <form onSubmit={createNote}>
        <input
          value={newNote}
          onChange={handleChange}
          placeholder='write note content here'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App