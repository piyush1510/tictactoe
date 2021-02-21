import React from 'react'
import './App.css';
import { Button } from '@material-ui/core'
import { IconButton } from '@material-ui/core';

const styleButton = {
  width:"100px",
  height:"100px",
  marginRight:"3px",
  marginBottom:"3px",
  fontSize:"40px",
  boxShadow:'0px 2px 2px black'
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
      turn:'X',
      winner:false,
      winnerIndex:[]
    }
  }
  turnToggle(i,j){
    setTimeout(() => {
      if(this.state.matrix[i][j]!=='.' || this.state.winner)
      return
      var matrixUpdate=this.state.matrix;
      matrixUpdate[i][j]=this.state.turn;
      this.setState({
        matrix:matrixUpdate,
        turn:((this.state.turn==='X') ? 'O' : 'X'),
        winner:false,
        winnerIndex:[]
      })
      
    }, 200);
    setTimeout(() => {
      this.checker(i,j);
    }, 220);
  }
  winner(config,i,j){
    var winningindices=[]
    if (config==='row') winningindices=[[i,0],[i,1],[i,2]]
    else if(config==='col') winningindices=[[0,j],[1,j],[2,j]]
    else if (config==='ii diag') winningindices=[[0,0],[1,1],[2,2]]
    else winningindices=[[0,2],[1,1],[2,0]]
    this.setState({
      matrix:this.state.matrix,
      turn:(this.state.turn==='X')? 'O':'X',
      winner:true,
      winnerIndex:winningindices,
    })
  }
  checker(I,J){
    //checking rows
    for(var i=0;i<3;i++)
    {
      for(var j=0;j<3;j++)
        {
          if(this.state.matrix[i][j]==='.' || this.state.matrix[i][j]===this.state.turn) {break;}
          else if(j==2) {this.winner('row',I,J);return;}
        }
    }
    // checking columns
    for(var i=0;i<3;i++){
      for(var j=0;j<3;j++){
          if(this.state.matrix[j][i]==='.' || this.state.matrix[j][i]===this.state.turn) {break;}
          else if(j===2) {this.winner('col',I,J);return;}
        }
    }
    // checking diagonals
    for(var i=0;i<3;i++){
      if(this.state.matrix[i][i]==='.' || this.state.matrix[i][i]===this.state.turn)
        break;
      else if(i===2)
        {this.winner('ii diag',I,J);return;}
    }
    for(var i=0;i<3;i++){
      if(this.state.matrix[i][2-i]==='.' || this.state.matrix[i][2-i]===this.state.turn)
        break;
      else if(i===2)
        {this.winner('else',I,J);return;}
    }
  }
  variant(i,j){
    if(!this.state.winner){
      return (this.state.matrix[i][j]!=='.')? "text":"contained";
    }
    else{
      for(var k=0;k<3;k++)
        if(this.state.winnerIndex[k][0]===i &&this.state.winnerIndex[k][1]===j) return "contained";
    }
    return 'text';
  }
  restart(){
    this.setState({
      matrix:[['.','.','.'],
              ['.','.','.'],
              ['.','.','.']],
      turn:'X',
      winner:false,
      winnerIndex:[]
    })
  }
  render(){
    var headingString="Chance Of";
    if(this.state.winner) headingString="Winner is"
    return (
      <div id="App">
        <h1 style={(this.state.winner) ? {color:'white'}:{}}>{headingString} : {this.state.turn}</h1>
        <div>
          <Button style={styleButton} variant={this.variant(0,0)} color="secondary" onClick={()=>{this.turnToggle(0,0)}}>{this.state.matrix[0][0]}</Button>
          <Button style={styleButton} variant={this.variant(0,1)} color="secondary" onClick={()=>{this.turnToggle(0,1)}}>{this.state.matrix[0][1]}</Button>
          <Button style={styleButton} variant={this.variant(0,2)} color="secondary" onClick={()=>{this.turnToggle(0,2)}}>{this.state.matrix[0][2]}</Button>
        </div>
        <div>
          <Button style={styleButton} variant={this.variant(1,0)} color="secondary" onClick={()=>{this.turnToggle(1,0)}}>{this.state.matrix[1][0]}</Button>
          <Button style={styleButton} variant={this.variant(1,1)} color="secondary" onClick={()=>{this.turnToggle(1,1)}}>{this.state.matrix[1][1]}</Button>
          <Button style={styleButton} variant={this.variant(1,2)} color="secondary" onClick={()=>{this.turnToggle(1,2)}}>{this.state.matrix[1][2]}</Button>
        </div>
        <div>
          <Button style={styleButton} variant={this.variant(2,0)} color="secondary" onClick={()=>{this.turnToggle(2,0)}}>{this.state.matrix[2][0]}</Button>
          <Button style={styleButton} variant={this.variant(2,1)} color="secondary" onClick={()=>{this.turnToggle(2,1)}}>{this.state.matrix[2][1]}</Button>
          <Button style={styleButton} variant={this.variant(2,2)} color="secondary" onClick={()=>{this.turnToggle(2,2)}}>{this.state.matrix[2][2]}</Button>
        </div>
        <IconButton id="resestButton" variant="contained" color="secondary"  onClick={()=>{this.restart()}}><i class="fa fa-redo" aria-hidden="true"></i></IconButton>
      </div>
    )
  }
}

export default App;
