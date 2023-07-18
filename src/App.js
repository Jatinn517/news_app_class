import './App.css';
import Navbar from './components/Navbar';

import React, { Component } from 'react'
import News from './components/News';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
        <Router>
      <div>
          <Navbar></Navbar>
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={5} country="in" category="general"></News>}></Route>
            <Route exact path="/general" element={<News key="general" pageSize={5} country="in" category="general"></News>}></Route>
            <Route exact path="/business" element={<News key="business" pageSize={5} country="in" category="business"></News>}></Route>
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={5} country="in" category="entertainment"></News>}></Route>
            <Route exact path="/sports" element={<News key="sports" pageSize={5} country="in" category="sports"></News>}></Route>
            <Route exact path="/health" element={<News key="health" pageSize={5} country="in" category="health"></News>}></Route>
            <Route exact path="/science" element={<News key="science" pageSize={5} country="in" category="science"></News>}></Route>
            <Route exact path="/technology" element={<News key="technology" pageSize={5} country="in" category="technology"></News>}></Route>
          </Routes>
        
      </div>
        </Router>
        
    )
  }
}

