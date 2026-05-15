import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/Header'
import "./css/Reset.css"
import "./App.css"

function App() {

  return (
    <>
    <Router>
      <Header></Header>
      <main className='main-content'>
      <Routes>

      </Routes>
      </main>
    </Router>


    </>
  )
}


export default App
