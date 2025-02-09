const Persons = ({person, erasePerson}) => {
    return(
        <div> 
            <p>
            {person.name} {person.number} <button onClick={erasePerson}>Delete</button>
            </p>
        </div>
    )
}

export default Persons