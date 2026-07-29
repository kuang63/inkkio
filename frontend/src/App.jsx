import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Card from './pages/Card/Card.jsx'

function App() {
  return (
    <div>
      <Router> 
        <Routes>
          <Route path = "/"/>
          {/* Each card will have a unique ID */}
          <Route path = "/card/:id" element = {<Card/>}/>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
