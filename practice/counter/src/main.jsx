import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App store={store}/>)
}

renderApp()
store.subscribe(renderApp)