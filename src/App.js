import React from 'react'
import './App.css';
import { Button } from '@material-ui/core'

const styleButton = {
  width:"100px",
  height:"100px",
  marginRight:"3px",
  marginBottom:"3px",
  fontSize:"40px"
}
const restartButton={
  marginTop:"10px",
  backgroundColor:"black",
  color:"crimson"
}
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      matrix:[['.','.','.'],
              ['.','.','.'],
              ['.','.','.']],
      turn:'X'
    }
  }
  turnToggle(i,j){
    setTimeout(() => {
      if(this.state.matrix[i][j]!=='.')
      return
      var matrixUpdate=this.state.matrix;
      matrixUpdate[i][j]=this.state.turn;
      this.setState({
        matrix:matrixUpdate,
        turn:((this.state.turn==='X') ? 'O' : 'X')
      })
      
    }, 200);
    setTimeout(() => {
      this.checker();
    }, 300);
  }
  winner(){alert('winner is found')}
  checker(){
    //checking rows
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<3;j++)
        {
          if(this.state.matrix[i][j]==='.' || this.state.matrix[i][j]===this.state.turn) {break;}
          else if(j==2) {this.winner();return;}
        }
    }
    // checking columns
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
          if(this.state.matrix[j][i]==='.' || this.state.matrix[j][i]===this.state.turn) {break;}
          else if(j===2) {this.winner();return;}
        }
    }
    // checking diagonals
    for(var i=0;i<3;i++){
      if(this.state.matrix[i][i]==='.' || this.state.matrix[i][i]===this.state.turn)
        break;
      else if(i===2)
        {this.winner();return;}
    }
    for(var i=0;i<3;i++){
      if(this.state.matrix[i][2-i]==='.' || this.state.matrix[i][2-i]===this.state.turn)
        break;
      else if(i===2)
        {this.winner();return;}
    }
  }
  restart(){
    this.setState({
        matrix:[['.','.','.'],['.','.','.'],['.','.','.']],
        turn:'X'
    })
  }
  render(){
    return (
      <div id="App">
        <h1>Chance Of : {this.state.turn}</h1>
        <div>
          <Button style={styleButton} variant={(this.state.matrix[0][0]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(0,0)}}>{this.state.matrix[0][0]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[0][1]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(0,1)}}>{this.state.matrix[0][1]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[0][2]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(0,2)}}>{this.state.matrix[0][2]}</Button>
        </div>
        <div>
          <Button style={styleButton} variant={(this.state.matrix[1][0]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(1,0)}}>{this.state.matrix[1][0]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[1][1]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(1,1)}}>{this.state.matrix[1][1]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[1][2]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(1,2)}}>{this.state.matrix[1][2]}</Button>
        </div>
        <div>
          <Button style={styleButton} variant={(this.state.matrix[2][0]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(2,0)}}>{this.state.matrix[2][0]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[2][1]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(2,1)}}>{this.state.matrix[2][1]}</Button>
          <Button style={styleButton} variant={(this.state.matrix[2][2]!=='.')? "text":"contained"} color="secondary" onClick={()=>{this.turnToggle(2,2)}}>{this.state.matrix[2][2]}</Button>
        </div>
        <Button variant="contained" style={restartButton} size="large" onClick={()=>{this.restart()}}> restart game </Button>
      </div>
    )
  }
}

export default App;
