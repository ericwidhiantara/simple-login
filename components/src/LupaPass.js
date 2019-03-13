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
        <Text style={{ color: "white", fontSize: 18 }}>Lupa Password</Text>
      </View>;
  }
}
// create a component
class LupaPass extends Component {
    static navigationOptions = {
    headerLeft: null,
    headerTitle: <LogoTitle />
  };
  render() {
    return (
      <View>
        <Text>Lupa Password</Text>
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
    marginTop: Platform.OS == "ios" ? 20 : 0
  },
  TextInputStyleClass: {
    textAlign: "center",
    height: 40,
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
    fontSize: 20
  },
  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196F3",
    marginBottom: 20,
    height: 40,
    width: "50%",
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
export default LupaPass;
