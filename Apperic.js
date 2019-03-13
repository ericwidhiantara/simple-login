//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Route from './components/Route';

// create a component
class App extends Component {
  render() {
    return (
      <Route/>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default App;
