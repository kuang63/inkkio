import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Card from './pages/card/Card.jsx';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/card/:id" element = {<Card/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
