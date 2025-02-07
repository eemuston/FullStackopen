const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) => {
    return (
      <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={(x) => setNewName(x.target.value)}/>
            <br/>
            number: <input value={newNumber} onChange={(x) => setNewNumber(x.target.value)}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm