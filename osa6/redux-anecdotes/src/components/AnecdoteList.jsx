import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const handleVote = ({anecdote, dispatch}) => {
    dispatch(vote(anecdote.id))
    dispatch(showNotification(`You voted "${anecdote.content}"!`, 5))
}

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '' ) {
            return anecdotes
        }
        else {
            return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }
    })
    
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    
    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote({anecdote, dispatch})}/>
            )}
        </div>
    )
}

export default AnecdoteList