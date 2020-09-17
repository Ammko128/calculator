import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import AdvancedCalculator from './components/AdvancedCalculator';

class App extends React.Component {
  state={
    classicCalculator:false
  }

  render(){
    return (
      this.state.classicCalculator ? <div className="appDiv">
      <Calculator />
      <div className="advancedCalculator">
        <button
          className="advancedCalculator"
          onClick={() => this.setState({classicCalculator:false})}
        >
          Advanced Calculator
        </button>
      </div>
        <div className="homePageDiv">
          <button
            className="homePage"
            onClick={() => window.location.href = "http://ammarveljagic.me"}
          >
            Back to home page
          </button>
        </div>
      </div> : <div className="appDiv">
      <AdvancedCalculator />
      <div className="classicCalculatorDiv">
        <button
          className="classicCalculator"
          onClick={() => this.setState({classicCalculator:true})}
        >
          Classic Calculator
        </button>
      </div>
        <div className="homePageDiv">
          <button
            className="homePage"
            onClick={() => window.location.href = "http://ammarveljagic.me"}
          >
            Back to home page
          </button>
        </div>
      </div>
    );
  }
}

export default App;
