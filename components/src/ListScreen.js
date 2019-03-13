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
  Alert,
  Image,
  FlatList,
  List,
  ListItem
} from "react-native";

class LogoTitle extends React.Component {
  render() {
    return <View style={{ flex: 1, alignItems: "center", backgroundColor: "#2196F3", justifyContent: "center", height: 70, width: "100%", marginTop: Platform.OS == "ios" ? 20 : 20, marginBottom: 10 }}>
        <StatusBar barStyle="light-content" hidden={false} backgroundColor="#2196F3" translucent={true} networkActivityIndicatorVisible={true} />
        <Text style={{ color: "white", fontSize: 18 }}>Mahasiswa</Text>
      </View>;
  }
}
class ListScreen extends Component {
    static navigationOptions = {
    headerLeft: null,
    headerTitle: <LogoTitle />
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
      ActivityIndicator_Loading: false, 
    };
}
 componentDidMount()  {
    this.setState({ ActivityIndicator_Loading : true }, () =>
    {
        this.setState({refreshing: true});
        const url = 'http://wadaya.rey1024.com/uasmobile/getMahasiswa.php';
       //this.setState({ loading: true });
        fetch (url)
        .then((response) => response.json())
        .then((responseJson) => {
          console.log("comp");
          console.log(responseJson);
          this.setState({
            data: responseJson,
            error: responseJson.error || null,
            loading: false,
            refreshing: false,
            ActivityIndicator_Loading: false, 

          });
        }
      );
    });
  }
    _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={ styles.container }>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={({item}) =>
            <View style={styles.row}>
            <View style={styles.iconContainer}>
          <Image source={{ uri: 'http://wadaya.rey1024.com/uasmobile/foto/'+ item.pic }} style={styles.icon} />
        </View>
        <View style={styles.info}>
              <Text>NIM : {item.nim}</Text>
              <Text>Nama : {item.name}</Text>
                <Text>Jenis Kelamin : {item.gender}</Text>
        </View>
            </View>
        }
        /> 
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: Platform.OS == "ios" ? 20 : 20
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
 row: {
    borderColor: '#f1f1f1',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    height: 50,
    width: 50,
  },
  icon: {
    height: '100%',
    width: '100%',
  },
});

//make this component available to the app
export default ListScreen;
