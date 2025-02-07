const Filter = ({searchName, setNewSearch}) => {
    return (
      <div>
        filter shown with <input value={searchName} onChange={(x) => setNewSearch(x.target.value)}/>
      </div>
    )
}

export default Filter