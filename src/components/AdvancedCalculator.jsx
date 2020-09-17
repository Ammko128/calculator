import React from 'react';

class AdvancedCalculator extends React.Component{
  state={
    shownVal:"0",
    secondaryVal:"0",
    closedParantheses:"",
    lastNumber:"",
    operatorNext:false
  }

  addDigit(val){
    if(this.state.operatorNext) return;
    var shownVal=this.state.shownVal+"";
    var lastNumber=this.state.lastNumber+"";
    if(lastNumber==="0") {shownVal=shownVal.slice(0,-1); lastNumber=lastNumber.slice(0,-1);}
    if((shownVal+"").length>=24) return;
    if(shownVal==="0") shownVal=val+"";
    else shownVal+=""+val;
    lastNumber+=val;
    this.setState({shownVal: shownVal, lastNumber: lastNumber});
  }

  addOperator(operator){
      var shownVal=this.state.shownVal+"";
      var secondaryVal=this.state.secondaryVal+"";
      secondaryVal=eval(secondaryVal.replaceAll("√", "Math.sqrt"));
      switch(shownVal[shownVal.length-1]){
        case "+":
        case "-":
        case "/":
        case "*":
        case "%":
        case ".":
          shownVal=shownVal.slice(0,-1);
        default:
          shownVal+=operator;
      }
      this.setState({shownVal:shownVal, lastNumber:"", secondaryVal:secondaryVal, operatorNext:false});
  }

  resetValues(){
    this.setState({shownVal:"0", lastNumber:"", closedParantheses:"", operatorNext: false});
  }

  calculate(operator){
    var shownVal=this.state.shownVal+"";
    switch(shownVal[shownVal.length-1]){
      case "+":
      case "-":
      case "/":
      case "*":
      case ".":
      case "%":
        shownVal=shownVal.slice(0,-1);
        break;
      default:
    }
    shownVal+=this.state.closedParantheses;
    var newVal=eval(shownVal.replaceAll("√", "Math.sqrt")).toPrecision(10);
    while(newVal.indexOf(".")!==-1 && newVal[newVal.length-1]==="0" && newVal.indexOf("e")===-1) newVal=newVal.slice(0, -1);
    if(newVal[newVal.length-1]===".") newVal=newVal.slice(0, -1);
    this.setState({shownVal:newVal, lastNumber:newVal, secondaryVal: shownVal, closedParantheses:"", operatorNext:false});
  }

  addComma(){
    if(this.state.operatorNext) return;
    var shownVal=this.state.shownVal+"";
    var lastNumber=this.state.lastNumber+"";
    var secondaryVal=this.state.secondaryVal+"";
    secondaryVal=eval(secondaryVal.replaceAll("√", "Math.sqrt"));
    if(lastNumber.indexOf(".")===-1){shownVal+="."; lastNumber+=".";}
    this.setState({shownVal:shownVal, lastNumber: lastNumber, secondaryVal: secondaryVal});
  }

  addParantheses(sqrt){
    if(this.state.operatorNext) return;
    var lastNumber=this.state.lastNumber+"";
    if(lastNumber) return;
    var shownVal=this.state.shownVal+"";
    if(shownVal==="0") shownVal="";
    var closedParantheses=this.state.closedParantheses+"";
    if(sqrt) shownVal+=sqrt;
    shownVal+="(";
    closedParantheses+=")";
    var secondaryVal=this.state.secondaryVal+"";
    secondaryVal=eval(secondaryVal.replaceAll("√", "Math.sqrt"));
    this.setState({shownVal:shownVal, closedParantheses: closedParantheses, secondaryVal:secondaryVal});
  }

  closeParantheses(){
    var shownVal=this.state.shownVal+"";
    switch(shownVal[shownVal.length-1]){
      case "+":
      case "-":
      case "*":
      case "/":
      case ".":
      case "%":
        shownVal=shownVal.slice(0,-1);
        break;
      default:
    }
    var closedParantheses=this.state.closedParantheses+"";
    if(closedParantheses.length===0) return;
    shownVal+=")";
    closedParantheses=closedParantheses.slice(0,-1);
    var secondaryVal=this.state.secondaryVal+"";
    secondaryVal=eval(secondaryVal.replaceAll("√", "Math.sqrt"));
    var operatorNext=true;
    while(shownVal.indexOf("()")!==-1) {shownVal=shownVal.replace("()", ""); operatorNext=false;}
    this.setState({shownVal:shownVal, closedParantheses: closedParantheses, secondaryVal:secondaryVal, lastNumber:"", operatorNext:operatorNext});
  }

  addSquareRoot(){
    var shownVal=this.state.shownVal+"";
    var lastNumber=this.state.lastNumber+"";
    var closedParantheses=this.state.closedParantheses+"";
    if(lastNumber && shownVal+""===eval(shownVal.replaceAll("√", "Math.sqrt")+this.state.closedParantheses)+"") {shownVal="√("+shownVal; closedParantheses+=")"; this.setState({shownVal:shownVal, closedParantheses:closedParantheses});}
    else this.addParantheses("√");
  }

  addAns(){
    if(this.state.lastNumber) return;
    var secondaryVal=this.state.secondaryVal+"";
    secondaryVal=eval(secondaryVal.replaceAll("√", "Math.sqrt"))+"";
    var shownVal=this.state.shownVal+"";
    var lastNumber=this.state.lastNumber+"";
    if(lastNumber==="0") {shownVal=shownVal.slice(0,-1); lastNumber=lastNumber.slice(0,-1);}
    for(var i=0; i<secondaryVal.length; i++){
      if((shownVal+"").length>=24) return;
      if(shownVal==="0") shownVal=secondaryVal[i]+"";
      else shownVal+=""+secondaryVal[i];
      lastNumber+=secondaryVal[i];
    }
    this.setState({shownVal: shownVal, lastNumber: lastNumber});
  }

  backSpace(){
    var shownVal=this.state.shownVal+"";
    var closedParantheses=this.state.closedParantheses;
    switch(shownVal[shownVal.length-1]){
      case "(":
        closedParantheses=closedParantheses.slice(0,-1);
        break;
      case ")":
        closedParantheses+=")";
        break;
      default:
    }
    shownVal=shownVal.slice(0,-1);
    if(shownVal.length===0) shownVal="0";
    var lastNumber=shownVal.split(/[+\-/*%]/)[shownVal.split(/[+\-/*%]/).length-1];
    if(parseFloat(lastNumber)==="NaN" || lastNumber==="0") lastNumber="";
    var operatorNext=false;
    if(shownVal[shownVal.length-1]===")") operatorNext=true;
    this.setState({shownVal:shownVal, closedParantheses: closedParantheses, lastNumber: lastNumber, operatorNext:operatorNext});
  }

  render(){
    return (
      <div className="calculatorDiv advanced">
        <div className="calculationStringDiv">
        <div className="secondaryStringDiv">Ans: {this.state.secondaryVal}</div>
          {this.state.shownVal}<div className="closedParanthesesDiv">{this.state.closedParantheses}</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addParantheses()} className="parantheses">(</div>
          <div onClick={(e)=>this.closeParantheses()} className="parantheses">)</div>
          <div onClick={(e)=>this.addAns()} className="ans">Ans</div>
          <div onClick={(e)=>this.backSpace()} className="backspace">⌫</div>
        </div>
        <div className="row">
          <div onClick={(e)=>{e.preventDefault(); this.addDigit(7);}} className="digit">7</div>
          <div onClick={(e)=>this.addDigit(8)} className="digit">8</div>
          <div onClick={(e)=>this.addDigit(9)} className="digit">9</div>
          <div onClick={(e)=>this.addOperator("+")} className="operator">+</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addDigit(4)} className="digit">4</div>
          <div onClick={(e)=>this.addDigit(5)} className="digit">5</div>
          <div onClick={(e)=>this.addDigit(6)} className="digit">6</div>
          <div onClick={(e)=>this.addOperator("-")} className="operator">-</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addDigit(1)} className="digit">1</div>
          <div onClick={(e)=>this.addDigit(2)} className="digit">2</div>
          <div onClick={(e)=>this.addDigit(3)} className="digit">3</div>
          <div onClick={(e)=>this.addOperator("*")} className="operator">*</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.addSquareRoot()} className="sqrt">√</div>
          <div onClick={(e)=>this.addDigit(0)} className="digit">0</div>
          <div onClick={(e)=>this.addComma()} className="comma">.</div>
          <div onClick={(e)=>this.addOperator("/")} className="operator">/</div>
        </div>
        <div className="row">
          <div onClick={(e)=>this.resetValues()} className="clear">AC</div>
          <div onClick={(e)=>this.calculate()} className="equals">=</div>
          <div onClick={(e)=>this.addOperator("%")} className="operator">%</div>
        </div>
      </div>
    );
  }
}

export default AdvancedCalculator;
