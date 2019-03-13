
import React, { Component } from 'react';
 
import {
  StyleSheet, View, Alert, TextInput, Button, FlatList,
  List,
  ListItem, Modal, Image, Text, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
 
import { StackNavigator } from 'react-navigation';


import Logo from './src/Logo';

class HomeStack extends Component{

  static navigationOptions =
  {
    header: null,
  };
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      Username: '',
      Password: ''
 
    }
 
  }

  UserLoginFunction = () =>{
 
    const { Username }  = this.state ;
    const { Password }  = this.state ;
    
    
   fetch('https://putugani97.000webhostapp.com/rec/LoginUSer.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       username: Username,
    
       password: Password
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
    
           // If server response message same as Data Matched
          if(responseJson === 'Data Matched')
           {
    
               //Then open Profile activity and send user email to profile activity.
               this.props.navigation.navigate('First', { username: Username });
    
           }
           else{
    
             Alert.alert(responseJson);
           }
    
         }).catch((error) => {
           console.error(error);
         });
    
     }
  render() {
    return (

      <View style={ styles.MainContainer2 }>
      <Logo/>
     <Text style={{marginRight:210,fontSize: 20,paddingTop:10, marginBottom: 3}}> Username </Text>
       <TextInput
         
         placeholder =" Username"
 
         onChangeText={Username => this.setState({Username})}
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:210,fontSize: 20, marginBottom: 7}}> Password </Text>
      <TextInput
         
         placeholder=" Password"
 
         secureTextEntry={true}

         onChangeText={Password => this.setState({Password})}
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
        <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} 
        onPress={this.UserLoginFunction} >
 
        <Text style={styles.TextStyle}> Login</Text>
 
      </TouchableOpacity>
         </View>

    );
  }

}

class Awal extends Component {

  static navigationOptions =
  {
    header: null,
  };
  render() {
    return (

      <View style={ styles.MainContainer2 }>
      <Logo/>
              <TouchableOpacity
                        activeOpacity={0.5 }
                        style={styles.TouchableOpacityStyle3}
                        onPress ={() => this.props.navigation.navigate('profile') }>
                      <Text style={styles.TextStyle }>DAFTAR</Text>
            </TouchableOpacity>
         </View>

    );
  }

}

class Home extends Component {
 
constructor(props) {
 
   super(props)
 
   this.state = {
 
     TextInput_nama: '',
     TextInput_nim: '',
     TextInput_jurusan: '',
     TextInput_telp: '',
     TextInput_sie: '',
 
   }
 
 }
 static navigationOptions =
 {
   title: 'Recruitment FTK',
 };
 
 InsertStudentRecordsToServer = () =>{
 
      fetch('https://putugani97.000webhostapp.com/rec/Insert.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
 
        nim : this.state.TextInput_nim,
 
        nama : this.state.TextInput_nama,
 
        jurusan : this.state.TextInput_jurusan,
 
        telp: this.state.TextInput_telp,

        sie: this.state.TextInput_sie,
 
      })
 
      }).then((response) => response.json())
          .then((responseJson) => {
 
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
 
          }).catch((error) => {
            console.error(error);
          });
          this.props.navigation.navigate('First');
 
}
 
 GoTo_Show_StudentList_Activity_Function = () =>
  {
    this.props.navigation.navigate('Second');
    
  }
 
 render() {
   return (
 
<View style={styles.MainContainer}>

       <Text style={{marginRight:200,fontSize: 20}}> Nama </Text>
       <TextInput
         
         placeholder ="nama"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_nama : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:200,fontSize: 20}}> Nim </Text>
      <TextInput
         
         placeholder=" nim"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_nim : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:200,fontSize: 20}}> Jurusan </Text>
      <TextInput
         
         placeholder="jurusan"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_jurusan : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:200,fontSize: 20}}> Telp </Text>
       <TextInput
 
         placeholder="telp"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_telp : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
          />
      <Text style={{marginRight:200,fontSize: 20}}> Sie </Text>
       <TextInput
 
         placeholder="sie"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_sie : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} 
        onPress={this.InsertStudentRecordsToServer} >
 
        <Text style={styles.TextStyle}>DAFTAR</Text>
 
      </TouchableOpacity>
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle2}
       onPress={this.GoTo_Show_StudentList_Activity_Function} >
 
        <Text style={styles.TextStyle}> LIHAT DATA FORM PENDAFTARAN </Text>
 
      </TouchableOpacity>
</View>
           
   );
 }
}
 
class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  }
  static navigationOptions =
  {
     title: 'Data Mahasiswa',
  };
 
  componentDidMount() {
    this.setState({ ActivityIndicator_Loading: true }, () => {
      this.setState({ refreshing: true });
      const url = "https://putugani97.000webhostapp.com/rec/tampil.php";
      //this.setState({ loading: true });
      fetch(url)
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
     GetnimFunction=(nim,nama,jurusan,telp,sie)=>{
 
          this.props.navigation.navigate('Third', { 
 
            ID : id,
            NIM : nim,
            NAME :nama,
            JURUSAN : jurusan,
            PHONE_NUMBER : telp,
            SIE : sie
 
          });
     }
 
     ListViewItemSeparator = () => {
       return (
         <View
           style={{
             height:2,
             width: "100%",
             backgroundColor: "#2196F3",
           }}
         />
       );
     }
 
     render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.data}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) =>
              <View style={styles.row}>
                <View style={styles.iconContainer}>
                  <Image source={{ uri: 'http://wadaya.rey1024.com/uasmobile/foto/' + item.pic }} style={styles.icon} />
                </View>
                <View style={styles.info}>
                  <Text>{item.nama}</Text>
                </View>
              </View>
            }
          />
        </View>
      );
    }
 
}
 
class Edit extends Component {
  
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         TextInput_nim: '',
         TextInput_nama: '',
         TextInput_jurusan: '',
         TextInput_telp: '',
         TextInput_sie: '',
    
       }
    
     }
 
     componentDidMount(){
 
      // Received Student Details Sent From Previous Activity and Set Into State.
      this.setState({ 
        TextInput_id : this.props.navigation.state.params.ID,
        TextInput_nim : this.props.navigation.state.params.NIM,
        TextInput_nama: this.props.navigation.state.params.NAME,
        TextInput_judul: this.props.navigation.state.params.JURUSAN,
        TextInput_telp: this.props.navigation.state.params.PHONE_NUMBER,
        TextInput_sie: this.props.navigation.state.params.SIE,
      })
 
     }
  
    static navigationOptions =
    {
       title: 'Merubah Data',
    };
 
    UpdateStudentRecord = () =>{
      
            fetch('https://putugani97.000webhostapp.com/rec/Update.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({

              id : this.state.TextInput_id,
      
              nim : this.state.TextInput_nim,
 
              nama : this.state.TextInput_nama,
      
              jurusan : this.state.TextInput_jurusan,
      
              sie : this.state.TextInput_sie
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
                this.props.navigation.navigate('First');
      
      }
      DeleteStudentRecord = () =>{
        
        fetch('https://putugani97.000webhostapp.com/rec/Delete.php', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
          id : this.state.TextInput_id
      
        })
      
        }).then((response) => response.json())
        .then((responseJson) => {
      
          // Showing response message coming from server after inserting records.
          Alert.alert(responseJson);
      
        }).catch((error) => {
           console.error(error);
        });
  
        this.props.navigation.navigate('First');
  
    }
    render() {
 
      return (
   
   <View style={styles.MainContainer}>
   
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}> Edit Form Pendaftaran </Text>
    
          <TextInput
            
            placeholder="nama"
            
            value={this.state.TextInput_nama}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_nama : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
          
          <TextInput
            
            placeholder="nim"
            
            value={this.state.TextInput_nim}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_nim : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />

         <TextInput
            
            placeholder="jurusan"
 
            value={this.state.TextInput_jurusan}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_jurusan : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TextInput
            
            placeholder="telp"
 
            value={this.state.TextInput_telp}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_telp : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
          <TextInput
   
            placeholder="sie"
 
            value={this.state.TextInput_sie}
   
            onChangeText={ TextInputValue => this.setState({ TextInput_sie : TextInputValue }) }
   
            underlineColorAndroid='transparent'
   
            style={styles.TextInputStyleClass}
          />
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.Update} >
   
            <Text style={styles.TextStyle}> SUMBMIT </Text>
   
         </TouchableOpacity>
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.Delete} >
   
            <Text style={styles.TextStyle}> HAPUS DATA </Text>
   
         </TouchableOpacity>
   </View>
              
      );
    }
 
}


export default MyNewProject = StackNavigator(
 
  {
    Home: { screen: HomeStack },

    Homee: {screen: Awal},

    First: { screen: Home },
 
    Second: { screen: List },
 
    Third: { screen: Edit }

 
  });
 
const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff"
  },
  MainContainer2: {
    alignItems: "center",
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#87CEFA"
  },
  MainContainer3: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#87CEFA",
    flexDirection: "row"
  },

  TextInputStyleClass: {
    textAlign: "center",
    marginTop: 7,
    marginBottom: 7,
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000"
  },
  TouchableOpacityStyle: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    width: "90%",
    backgroundColor: "#2196F3"
  },
  TouchableOpacityStyle2: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    width: "90%",
    backgroundColor: "#2196F3"
  },
  TouchableOpacityStyle3: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    width: "30%",
    backgroundColor: "#2196F3"
  },
  TextStyle: {
    color: "#fff",
    textAlign: "center"
  },
  rowViewContainer: {
    flex: 1,
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  ContainerList: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 5,
    marginBottom: 5
  },
  conPreview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  uploadAvatar: {
    height: 150,
    width: 150
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    borderColor: "#f1f1f1",
    borderBottomWidth: 1,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    height: 50,
    width: 50
  },
  icon: {
    height: "100%",
    width: "100%"
  }
});