import React from 'react';
import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Chatarea from './components/Chatarea';

import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className="background">
      <Header />
      <Route path='/' exact component={Form} />
      <Route path='/chatarea' component={Chatarea}  />
    </div>
    </Router>
  );
}

export default App;
