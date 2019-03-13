import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Logo extends Component<{}> {
  render() {
    return(
    <View style={styles.container}>
      <Image style={{width:185, height:170}}
        source={require('./images/Logo.png')}/>
        <Text style={styles.logoText}>RECRUITMENT ORGANISASI FTK</Text>
        </View>
    ) 
  }
} 

const styles = StyleSheet.create({
    container : {
      paddingTop:40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logoText: {
      paddingTop:5,
      paddingBottom:5,
        marginVertical:15,
      fontSize:18,
      color : '#3333ff'
    }
 });