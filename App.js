/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Alert, TouchableOpacity } from 'react-native';
import { tsBooleanKeyword } from '@babel/types';
import { MaterialCommunityIcons as Icons } from 'react-native-vector-icons';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (


      <View style={styles.container}>
        <Board />
      </View>

    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareArray: Array(9).fill(null),
      xTurn: true,
      drawn: false,
      count:0,
    }
  }

  componentDidMount() {
    this.arrayInitilaization();
  }

  arrayInitilaization = () => {
    this.setState({ squareArray:  Array(9).fill(null) });
  }

  renderSquare = (i) => {
    sArray = this.state.squareArray.slice();
    if (winningPosition(sArray) ) {
      Alert.alert("Game won by "+(this.state.xTurn?"X":"O"));
      this.setState({
          sArray:sArray.fill(null),
      })
      this.arrayInitilaization();
      return;
    }
    if(sArray[i] !=null){return}
    sArray[i] = this.state.xTurn?"X":"O";
    this.setState({ squareArray: sArray })
    // this.setState({ count: count+1 })
    // Alert.alert(this.state.count);
  }

  markerTOShow = (i) => {
    var value = this.state.squareArray[i];
    this.state.xTurn = !this.state.xTurn;
    if (value == "X") {
        return (
          <Text style={styles.textcolorX}>X</Text>
        );       
    }else if(value == "O"){
      return (
        <Text style={styles.textcolorO}>O</Text>
      );
    }
  }

  render() {
    const winner = winningPosition(this.state.squareArray)
    var winnerIs = "Game is on"
    
        if(winner){
          winnerIs = "Game is won by "+(this.state.xTurn?"X":"O");
          Alert.alert("Game won by "+(this.state.xTurn?"X":"O"));
          this.arrayInitilaization();
          // this.setState({squareArray:squareArray.fill(null)});
        }else if(this.state.count == 8){
          winnerIs = "Game is Drawn"
          Alert.alert("Game is Drawn");
          this.arrayInitilaization();
          // this.setState({squareArray:squareArray.fill(null)});
        }else{
            winnerIs = "Next turn is of "+(this.state.xTurn?"O":"X");
        }
    

    return (
      <View style={{ flexDirection: 'column' }}>
      <Text >{winnerIs}</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(0)}>
            {this.markerTOShow(0)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(1)}>
            {this.markerTOShow(1)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(2)} >
            {this.markerTOShow(2)}
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(3)}>
            {this.markerTOShow(3)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(4)}>
            {this.markerTOShow(4)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(5)}>
            {this.markerTOShow(5)}
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(6)}>
            {this.markerTOShow(6)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(7)}>
            {this.markerTOShow(7)}
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile} onPress={() => this.renderSquare(8)}>
            {this.markerTOShow(8)}
          </TouchableOpacity>

        </View>

      </View>

    );
  }
}


winningPosition = (square) =>{

  const lines= [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
  ];
  for(let i=0;i<lines.length;i++){
      const [a,b,c] = lines[i];
      if(square[a] && square[a] === square[b] && square[c] === square[a]){
          return square[a]
      }
  }
  return null
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tile: {
    width: 100,
    height: 100,
    borderWidth: 3,
  },
  textcolorX:{
    fontWeight:'bold',
    color: 'red',
    fontSize: 40,
    alignItems:'center',
    justifyContent:'flex-end',
    textAlign:'center',
    marginTop:20,
  },
  textcolorO:{
    fontWeight:'bold',
    color: 'blue',
    fontSize: 40,
    alignItems:'center',
    justifyContent:'flex-end',
    textAlign:'center',
    marginTop:20,
  }

});
