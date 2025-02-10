const Filter = ({searchName, setNewSearch}) => {
    return (
      <div>
        find countries <input value={searchName} onChange={(x) => setNewSearch(x.target.value)}/>
      </div>
    )
}

export default Filter