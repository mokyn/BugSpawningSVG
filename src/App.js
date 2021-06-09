import beetle from './beetle.jpg';
import './App.css';
import React from 'react';

function Bug(props){
  return (
    <span>
    <img src={beetle} width="100" height="100" onClick={props.onClick}></img>
    <div>{props.id}</div>
    </span>
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

  componentWillMount(){
    setInterval(this.newBug.bind(this),1000)
  }

  newBug() {
    var newBugs=this.state.bugs;
    var i = this.state.n;
    newBugs.push(<Bug onClick={()=> this.handleClick(i)} id={i}></Bug>)
    this.setState({
      bugs:newBugs,
      n:this.state.n+1
    })
  }

  handleClick(n) {
    var newBugs=this.state.bugs;
    for (var i=0;i<this.state.bugs.length;i++) {
      if (this.state.bugs[i].props.id == n) {
        newBugs.splice(i,1);
      }
    }
    this.setState({
      bugs:newBugs,
    })
  }

  render() {
    return (
      <ul>
        {this.state.bugs}
      </ul>
    )
  }
}

function App() {
  return (
    <Game></Game>
  );
}

export default App;
