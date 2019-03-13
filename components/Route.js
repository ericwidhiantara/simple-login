//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation'; 
import HomeScreen from './src/HomeScreen';
import LupaPass from './src/LupaPass';
import ListScreen from './src/ListScreen';

// create a component
export default class Route extends React.Component {
  render() {
    return (
      <HomeStack/>
    );
  }
}
const HomeStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    List: {
      screen: ListScreen,
    },
    Lupa: {
      screen: LupaPass,
    },
  },
  {
    initialRouteName: 'Home',
  },
  {
    navigationOptions: {
      headerLeft: null
    }
  }
);
