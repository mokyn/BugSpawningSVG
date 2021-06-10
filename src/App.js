//import beetle from './Green_beetle.svg';
//import beetle2 from './beetle.jpg';
import './App.css';
import React from 'react';

function Bug(props){
  const x=props.x;
  const y=props.y;
  return (
    <g>
      <circle cx={x} cy={y} r={20} stroke="green" fill="green" strokeWidth="4" onClick={props.onClick}/>
      <line x1={x} y1={y} x2={x+30} y2={y+30} stroke="green" fill="green" strokeWidth="4"/>
      <line x1={x} y1={y} x2={x+30} y2={y-30} stroke="green" fill="green" strokeWidth="4"/>
      <line x1={x} y1={y} x2={x-30} y2={y+30} stroke="green" fill="green" strokeWidth="4"/>
      <line x1={x} y1={y} x2={x-30} y2={y-30} stroke="green" fill="green" strokeWidth="4"/>
    </g>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs:[],
      n:0,
    }
  }

  componentDidMount(){
    setInterval(this.newBug.bind(this),1000)
  }

  newBug() {
    var newBugs=this.state.bugs;
    var i = this.state.n;
    newBugs.push(<Bug onClick={()=> this.handleClick(i)} id={i} x={500*Math.random()} y={500*Math.random()} />)
    this.setState({
      bugs:newBugs,
      n:this.state.n+1
    })
  }

  handleClick(n) {
    var newBugs=this.state.bugs;
    console.log(this.state.bugs.length);
    for (var i=0;i<this.state.bugs.length;i++) {
      console.log(i);
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
