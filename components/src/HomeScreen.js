//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Slider, 
  ActivityIndicator,
  StatusBar,
  Platform,
  Alert
} from "react-native";

class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 70, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 20, marginBottom: 10 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
        <Text style={{ color: "white", fontSize: 18 }}>UAS Mobile</Text>
        <Text style={{ color: "white", fontSize: 10 }}>Eric Widhi Antara</Text>
      </View>;
  }
}

// create a component
class HomeScreen extends Component {
     static navigationOptions = {
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      ActivityIndicator_Loading: false
    };
  }
   Login = () =>{  
     
      if(this.state.password==123){
      this.props.navigation.navigate('List',
          {
            password: this.state.password,
          }
        );
      }else
      {
         Alert.alert(
           'Gagal',
           'Login gagal!',
           [
             {text: 'OK', onPress: () => console.log('OK Pressed!')},
           ],
           {cancelable: false}
         )
      }
    };
    ForgotPassword = () =>{
        this.props.navigation.navigate('Lupa');
    };

  render() {
     
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.5,  }}>
            <TextInput
            style={styles.TextInputStyleClass}
            placeholder="Masukan Password"
            underlineColorAndroid="transparent"
            secureTextEntry
            onChangeText={TextInputText =>
              this.setState({ password: TextInputText })
            }
          />
        </View>
          <View style={{ flex: 1,flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.Login.bind(
            this, this.state.password,
          )}>
             <Text style={ styles.TextClass }>Masuk</Text>
            </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.TouchableOpacityStyle} onPress={this.ForgotPassword.bind(
            this)}>
             <Text style={ styles.TextClass }>Lupa Password</Text>
            </TouchableOpacity>
           </View>
        
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 20 : 20
  },
  TextInputStyleClass: {
    textAlign: "center",
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#2196F3",
    borderRadius: 7,
    marginBottom: 10,
    width: "100%"
  },
   TextClass: {
    textAlign: "center",
    height: 40,
    width: "100%",
    marginTop: 10,
    color: "#FFFFFF",
    fontSize: 15
  },
  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    margin: 10,
    height: 40,
    width: "40%",
    borderRadius: 7
  },
  ActivityIndicatorStyle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  },

});

//make this component available to the app
export default HomeScreen;
