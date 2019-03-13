
import React, { Component } from 'react';
 
import {
  StyleSheet, View, Alert, FlatList,
  ListItem, TextInput, Button, Modal, Image, Text, Platform, ScrollView, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
 
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
               this.props.navigation.navigate('Homee', { username: Username });
    
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
     <Text style={{marginRight:0.5,fontSize: 15,paddingTop:10, marginBottom: 3}}> USERNAME </Text>
       <TextInput
         
         placeholder =" Username"
 
         onChangeText={Username => this.setState({Username})}
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:0.5,fontSize: 15, marginBottom: 7}}> PASSWORD </Text>
      <TextInput
         
         placeholder=" Password"
 
         secureTextEntry={true}

         onChangeText={Password => this.setState({Password})}
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
        <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} 
        onPress={this.UserLoginFunction} >
 
        <Text style={styles.TextStyle}> LOGIN</Text>
 
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
                        onPress ={() => this.props.navigation.navigate('First') }>
                      <Text style={styles.TextStyle }>PENDAFTARAN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                        activeOpacity={0.5 }
                        style={styles.TouchableOpacityStyle3}
                        onPress ={() => this.props.navigation.navigate('Second') }>
                      <Text style={styles.TextStyle }>DATA FORM PENDAFTARAN</Text>
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
     image: '',
     srcImg: '',
     uri: '',
     fileName: '',
   }
 
 }
 static navigationOptions =
 {
   title: 'Form Pendaftaran',
 };
 
  submitData = () => {
    this.uploadPicture();
    this.setState({ ActivityIndicator_Loading: true }, () => {
      fetch("https://putugani97.000webhostapp.com/rec/Insert.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nim: this.state.TextInput_nim,
          nama: this.state.TextInput_nama,
          jurusan: this.state.TextInput_jurusan,
          telp: this.state.TextInput_telp,
          sie: this.state.TextInput_sie,
          image: this.state.image
        })
      })
        .then(response => response.json())
        .then(responseJsonFromServer => {
          Alert.alert("SUCESS", responseJsonFromServer);
          this.setState({ ActivityIndicator_Loading: false });
          this.props.navigation.navigate("Account");
        })
        .catch(error => {
          console.error(error);

          this.setState({ ActivityIndicator_Loading: false });
        });
    });
  }
  submitAllData = () => {

    this.submitData();
  }

  choosePicture = () => {
    console.log("upload")
    var ImagePicker = require('react-native-image-picker');
    var options = {
      title: 'Pilih Gambar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
        console.log(source);
        console.log(response.fileName);
        this.setState({
          srcImg: source,
          uri: response.uri,
          fileName: response.fileName,
          image: response.fileName,
        });
      }
    });
  };

  uploadPicture = () => {
    console.log('mulai upload');
    this.setState({ loading: true })

    const data = new FormData();
    //data.append('name', 'Fotoku'); // you can append anyone.
    data.append('fileToUpload', {
      uri: this.state.uri,
      type: 'image/jpeg', // or photo.type
      name: this.state.fileName,
    });
    const url = "https://putugani97.000webhostapp.com/rec/uploadGambar.php";
    fetch(url, {
      method: 'post',
      body: data
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          loading: false
        })
      });
  }
 
 
 render() {
   return (
 <ScrollView>
<View style={styles.MainContainer}>
       <View style={{ flex: 1, paddingBottom: 20 }}>
         <TouchableOpacity onPress={this.choosePicture.bind(this)}>
           <View style={styles.ImageContainer}>
             {this.state.srcImg === null ? (
               <Text>Select a Photo</Text>
             ) : (
                 <Image
                   style={styles.ImageContainer}
                   source={this.state.srcImg}
                 />
               )}
           </View>
         </TouchableOpacity>
       </View>
       <Text style={{marginRight:5,fontSize: 17}}> NAMA </Text>
       <TextInput
         
         placeholder ="nama"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_nama : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:5,fontSize: 17}}> NIM </Text>
      <TextInput
         
         placeholder=" nim"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_nim : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:5,fontSize: 17}}> JURUSAN </Text>
      <TextInput
         
         placeholder="jurusan"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_jurusan : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
      <Text style={{marginRight:5,fontSize: 17}}> TELP </Text>
       <TextInput
 
         placeholder="telp"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_telp : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
          />
      <Text style={{marginRight:5,fontSize: 17}}> SIE </Text>
       <TextInput
 
         placeholder="sie"
 
         onChangeText={ TextInputValue => this.setState({ TextInput_sie : TextInputValue }) }
 
         underlineColorAndroid='transparent'
 
         style={styles.TextInputStyleClass}
       />
 
      <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} 
         onPress={this.submitAllData} >
 
        <Text style={styles.TextStyle}>DAFTAR</Text>
 
      </TouchableOpacity>
 
</View>
     </ScrollView>      
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
     title: 'Data Form Pendaftaran',
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
     GetnimFunction=(id,nim,nama,jurusan,telp,sie)=>{
 
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
              <View style={styles.row}
                
              >
                <View style={styles.iconContainer}>
                  <Image source={{ uri: 'https://putugani97.000webhostapp.com/rec/img/' + item.image }} style={styles.icon} />
                </View>
                <View style={styles.info} >
                  <Text onPress={this.GetnimFunction.bind(
                    this, item.id,
                    item.nim,
                    item.nama,
                    item.jurusan,
                    item.telp,
                    item.sie
                  )}>{item.nama}</Text>
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
         TextInput_id: '',
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
        TextInput_jurusan: this.props.navigation.state.params.JURUSAN,
        TextInput_telp: this.props.navigation.state.params.PHONE_NUMBER,
        TextInput_sie: this.props.navigation.state.params.SIE,
      })
 
     }
  
    static navigationOptions =
    {
    
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

              telp : this.state.TextInput_telp,
      
              sie : this.state.TextInput_sie
      
            })
      
            }).then((response) => response.json())
                .then((responseJson) => {
      
                  // Showing response message coming from server updating records.
                  Alert.alert(responseJson);
      
                }).catch((error) => {
                  console.error(error);
                });
                this.props.navigation.navigate('Homee');
      
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
  
        this.props.navigation.navigate('Homee');
  
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
   
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.UpdateStudentRecord} >
   
            <Text style={styles.TextStyle}> SUBMIT </Text>
   
         </TouchableOpacity>
         <TouchableOpacity activeOpacity = { .4 } style={styles.TouchableOpacityStyle} onPress={this.DeleteStudentRecord} >
   
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
 
  MainContainer :{
 
    alignItems: 'center',
    flex:1,
    backgroundColor: '#e6e6e6'
 
  },
  MainContainer2 :{
 
    alignItems: 'center',
    flex:1,
    paddingTop: 20,
    backgroundColor: '#e6e6e6'
 
  },
  MainContainer3 :{
 
    alignItems: 'center',
    flex:1,
    backgroundColor: '#e6e6e6',
    flexDirection: 'row',
 
  },

  TextInputStyleClass: {
 
    textAlign:'center',
    marginTop:7,
    marginBottom:20,
    width:'90%',
    height:40,
    borderWidth:3,
    borderRadius:5,
    borderColor:'#000'
 
  },
  TouchableOpacityStyle: {
    marginTop:5,
    paddingTop:5,
    paddingBottom:20,
    borderRadius:2,
    width: '40%',
    backgroundColor: '#0000ff'
  
 
  },
  TouchableOpacityStyle2: {
    marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:5,
    width: '90%',
    backgroundColor: '#0000ff'
  
 
  },
  TouchableOpacityStyle3: {
    marginTop:22,
    paddingTop:10,
    paddingBottom:40,
    borderRadius:10,
    width: '70%',
    backgroundColor: '#0000ff'
  
 
  },
  TextStyle:{
    color:'#fff',
    textAlign:'center',
  },
  rowViewContainer: {
    
    flex:1,
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
 ContainerList:{
   flex:1,
   paddingTop:20,
   marginLeft: 5,
   marginBottom:5
 },
 conPreview: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
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
  },
  ImageContainer: {
    borderRadius: 10,
    width: 150,
    height: 150,
    borderColor: "#2196F3",
    borderWidth: 1 ,
    justifyContent: "center",
    alignItems: "center",

  }
});