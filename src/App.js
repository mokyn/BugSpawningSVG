//import beetle from './Green_beetle.svg';
//import beetle2 from './beetle.jpg';
import './App.css';
import React from 'react';

class Bug extends React.Component {
  posIntervalID=0;
  moveIntervalID=0;

  constructor(props) {
    super(props);
    this.state = {
      x:this.props.x,
      y:this.props.y,
      targetx:500*Math.random(),
      targety:500*Math.random(),
    }
  }

  newPos() {
    this.setState({
      targetx:500*Math.random(),
      targety:500*Math.random(),
    })
  }

  move() {
    const moveRate=0.01;
    this.setState({
      x:(moveRate*this.state.targetx+this.state.x)/(1+moveRate),
      y:(moveRate*this.state.targety+this.state.y)/(1+moveRate),
    })
  }

  componentDidMount(){
    this.posIntervalID = setInterval(this.newPos.bind(this),2000);
    this.moveIntervalID = setInterval(this.move.bind(this),20);
  }

  componentWillUnmount(){
    clearInterval(this.posIntervalID);
    clearInterval(this.moveIntervalID);
  }

  render() {
    const x=this.state.x;
    const y=this.state.y;
    return (
      <g>
        <circle cx={x} cy={y} r={30} stroke="white" fill="white" fillOpacity={0} strokeWidth="0" onClick={this.props.onClick}/>
        <circle cx={x} cy={y} r={20} stroke="green" fill="green" strokeWidth="0" onClick={this.props.onClick}/>
        <line x1={x} y1={y} x2={x+30} y2={y+30} stroke="green" fill="green" strokeWidth="4"/>
        <line x1={x} y1={y} x2={x+30} y2={y-30} stroke="green" fill="green" strokeWidth="4"/>
        <line x1={x} y1={y} x2={x-30} y2={y+30} stroke="green" fill="green" strokeWidth="4"/>
        <line x1={x} y1={y} x2={x-30} y2={y-30} stroke="green" fill="green" strokeWidth="4"/>
      </g>
  )
  }
}

class Game extends React.Component {
  intervalID=0;
  
  constructor(props) {
    super(props);
    this.state = {
      bugs:[],
      n:0,
    }
  }

  componentDidMount(){
    this.intervalID = setInterval(this.newBug.bind(this),5000)
    this.newBug();
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  newBug() {
    var newBugs=this.state.bugs;
    var i = this.state.n;
    newBugs.push(<Bug key={i} id={i} onClick={()=> this.handleClick(i)} x={500*Math.random()} y={500*Math.random()} />)
    this.setState({
      bugs:newBugs,
      n:this.state.n+1
    })
  }

  handleClick(n) {
    var newBugs=this.state.bugs;
    for (var i=0;i<this.state.bugs.length;i++) {
      if (this.state.bugs[i].props.id === n) {
        newBugs.splice(i,1);
      }
    }
    this.setState({
      bugs:newBugs,
    })
  }

  render() {
    return (
      <svg width="500" height="500">
        {this.state.bugs}
      </svg>
    )
  }
}

function App() {
  return (
    <Game/>
  );
}

export default App;
