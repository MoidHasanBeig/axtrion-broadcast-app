import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Broadcast from './Broadcast/Broadcast';
import Watch from './Watch/Watch';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/webcam" exact component={Broadcast} />
        <Route path="/watchlive" exact component={Watch} />
      </div>
    </Router>
  );
}

export default App;
