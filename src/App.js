import logo from './logo.svg';
import './App.css';
import Usurvey from './Usurvey';
import { Component } from 'react';

class  App extends Component {
  render()
  {
    return (
      <div className="App">
        <div className="App-header">
          
          <h1>Welcome to my firebase learning</h1>
          
        </div>
        <Usurvey/>
      </div>
    );
  }
}

export default App;
