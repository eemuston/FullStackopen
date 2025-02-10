const Countries = ({ country, ButtonHandler }) => {
    return(
        <div> 
            <p>
            {country} <button onClick={ButtonHandler}>Show</button>
            </p>
        </div>
    )
}

export default Countries