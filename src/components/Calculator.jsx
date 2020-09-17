import React from 'react';

class Calculator extends React.Component{
  state={
    prevVal:"0",
    newVal:"",
    operator:"",
    resultVal:"0",
    shownVal:"0",
    copiedVal:"",
    secondaryVal:"0"
  }

  addDigit(val){
    if(!this.state.operator){
      var prevVal=this.state.prevVal;
      if((prevVal+"").length>=24) return;
      if(prevVal==="0" || this.state.newNumber) prevVal=val+"";
      else prevVal+=""+val;
      var shownVal=prevVal;
      this.setState({prevVal:prevVal, shownVal: shownVal, newNumber:false});
    }
    else{
      var newVal=this.state.newVal;
      if((newVal+"").length>=24) return;
      if(!newVal || newVal==="0") newVal=val+"";
      else newVal+=""+val;
      shownVal=newVal;
      this.setState({newVal:newVal, shownVal: shownVal, newNumber:false});
    }
  }

  setOperator(operator){
    if(this.state.newVal) {
      this.calculate(operator);
    }
    else {
      var resultVal=this.state.prevVal;
      var secondaryVal=resultVal+operator;
      this.setState({resultVal:resultVal, shownVal:"0", newVal:"", prevVal:resultVal, secondaryVal:secondaryVal});
    }
    this.setState({operator:operator, newNumber:false});
  }

  resetValues(){
    this.setState({resultVal:"0", operator:"", shownVal:"0", newVal:"", prevVal:"0", secondaryVal:"0", newNumber:true});
  }

  calculate(operator){
    var resultVal;
    switch(this.state.operator){
      case "+":
      resultVal=(parseFloat(this.state.prevVal)+parseFloat(this.state.newVal)).toPrecision(10)+"";
      break;
      case "-":
      resultVal=(parseFloat(this.state.prevVal)-parseFloat(this.state.newVal)).toPrecision(10)+"";
      break;
      case "*":
      resultVal=(parseFloat(this.state.prevVal)*parseFloat(this.state.newVal)).toPrecision(10)+"";
      break;
      case "/":
      resultVal=(parseFloat(this.state.prevVal)/parseFloat(this.state.newVal)).toPrecision(10)+"";
      break;
      default:
    }
    if(!this.state.newVal) resultVal=this.state.prevVal+"";
    while(resultVal.indexOf(".")!==-1 && resultVal[resultVal.length-1]==="0" && resultVal.indexOf("e")===-1) resultVal=resultVal.slice(0, -1);
    if(resultVal[resultVal.length-1]===".") resultVal=resultVal.slice(0, -1);
    var shownVal=resultVal;
    var secondaryVal=resultVal;
    if(operator) {secondaryVal+=operator; shownVal="0";}
    this.setState({resultVal:resultVal, shownVal:shownVal, newVal:"", prevVal:resultVal, operator:"", secondaryVal:secondaryVal, newNumber:true});
  }

  addComma(){
    if(!this.state.operator){
      var prevVal=this.state.prevVal+"";
      if(prevVal.indexOf(".")===-1) prevVal+=".";
      var shownVal=prevVal;
      this.setState({prevVal:prevVal, shownVal: shownVal});
    }
    else{
      var newVal=this.state.newVal+"";
      if(!newVal) newVal="0";
      if(newVal.indexOf(".")===-1) newVal+=".";
      shownVal=newVal;
      this.setState({newVal:newVal, shownVal: shownVal});
    }
  }

  copyValue(){
    var copyValue=this.state.shownVal;
    this.setState({copyValue:copyValue});
  }

  pasteValue(){
    if(!this.state.copyValue) return;
    var pasteValue = this.state.copyValue;
    if(this.state.operator) this.setState({newVal:pasteValue, shownVal: pasteValue});
    else this.setState({prevVal:pasteValue, shownVal: pasteValue, secondaryVal:"0"});
  }

  render(){
    return (
      <div className="calculatorDiv">
        <div className="calculationStringDiv">
        <div className="secondaryStringDiv">{this.state.secondaryVal}</div>
          {this.state.shownVal}
        </div>
        <div className="row">
          <div onClick={(e)=>{e.preventDefault(); this.addDigit(7);}} className="digit">7</div>
          <div onClick={(e)=>this.addDigit(8)} className="digit">8</div>
          <div onClick={(e)=>this.addDigit(9)} className="digit">9</div>
          <div onClick={(e)=>this.setOperator("+")} className="operator">+</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addDigit(4)} className="digit">4</div>
          <div onClick={(e)=>this.addDigit(5)} className="digit">5</div>
          <div onClick={(e)=>this.addDigit(6)} className="digit">6</div>
          <div onClick={(e)=>this.setOperator("-")} className="operator">-</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addDigit(1)} className="digit">1</div>
          <div onClick={(e)=>this.addDigit(2)} className="digit">2</div>
          <div onClick={(e)=>this.addDigit(3)} className="digit">3</div>
          <div onClick={(e)=>this.setOperator("*")} className="operator">*</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.resetValues()} className="clear">AC</div>
          <div onClick={(e)=>this.addDigit(0)} className="digit">0</div>
          <div onClick={(e)=>this.addComma()} className="comma">.</div>
          <div onClick={(e)=>this.setOperator("/")} className="operator">/</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.copyValue()} className="mc">MC</div>
          <div onClick={(e)=>this.pasteValue()} className="mp">MP</div>
          <div onClick={(e)=>this.calculate()} className="equals">=</div>
        </div>
      </div>
    );
  }
}

export default Calculator;
