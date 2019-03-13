import React from 'react';
import { StyleSheet,
 Text,
 Button,
 TouchableOpacity,
 View,
 ImageBackground,
 StatusBar,
 Image,
 TextInput,
 ScrollView,
 Alert, ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
const home = require('./img/home.png');
const custemer = require('./img/custemer.png');
const tambah = require('./img/tambah.png');
class TambahScreen extends React.Component {
  static navigationOptions = {
    header: null
 };

  constructor()
    {
        super();
        this.state = {
          nama: '',
          nim: '',
          jurusan: '',
          nohp: '',
          pilihansie: '',
          ActivityIndicator_Loading: false,
        }
    }
    submitData = () =>
    {
        this.setState({ ActivityIndicator_Loading : true }, () =>
        {
            fetch('http://mhs.rey1024.com/appmobile/D1615051109/kirimData.php',
            {
                method: 'POST',
                headers:
                {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                {
                  nama : this.state.nama,
                  nim : this.state.nim,
                  jurusan : this.state.jurusan,
                  nohp : this.state.nohp,
                  pilihansie : this.state.sie,
                })

            }).then((response) => response.json()).then((responseJsonFromServer) =>
            {
                Alert.alert('SUCESS', responseJsonFromServer);
                this.setState(
                {
                  nama: '',
                  nim: '',
                  jurusan: '',
                  nohp: '',
                  pilihansie: '',
                });
                ActivityIndicator_Loading : false

            }).catch((error) =>
            {
                console.error(error);
                this.setState({ ActivityIndicator_Loading : false});
            });
        });
    }


  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator color='#FFFFFF' size='large'/>
        </View>
      );
    }

    return(
      <ImageBackground
          source={require('./img/14.jpg')}
          style={styles.container}>
            <View style={styles.containerMain}>
              <StatusBar
                backgroundColor="#AD1457"
                barStyle="light-content"
              />
              <Text style={styles.title}>RECRUITMENT KEPANITIAAN FTK</Text>
              <Text style={styles.subTitle}>Form Pendaftaran</Text>
              <View style={{ backgroundColor: 'rgba(255,255,255, .4)', marginTop: 15 }}>
              <ScrollView>
               <Text style={styles.judul} >NAMA  :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Nama"
                  onChangeText = {(TextInputText) => this.setState({ nama: TextInputText })}
                  value={this.state.nama}
              />

              <Text style={styles.judul} >NIM  :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Nim"
                  onChangeText = {(TextInputText) => this.setState({ nim: TextInputText })}
                  value={this.state.nim}
              />
              <Text style={styles.judul} >JURUSAN :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Jurusan"
                  onChangeText = {(TextInputText) => this.setState({ jurusan: TextInputText })}
                  value={this.state.jurusan}
              />

              <Text style={styles.judul} >NO HP :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan NO HP"
                  onChangeText = {(TextInputText) => this.setState({ nohp: TextInputText })}
                  value={this.state.nohp}
              />

              <Text style={styles.judul} >PILIHAN SIE :</Text>
              <TextInput
                  style={styles.isian}
                  placeholder="Masukan Pilihan Sie"
                  onChangeText = {(TextInputText) => this.setState({ sie: TextInputText })}
                  value={this.state.sie}
              />
              </ScrollView>
              </View>
              <View style={{alignItems: 'center'}}>
              <TouchableOpacity style={styles.button}
                  onPress={this.submitData}>
                <Text style={{ fontSize: 20, color: '#fff',fontWeight: 'bold' }}>SAVE</Text>
              </TouchableOpacity>
              </View>

            </View>
            <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <Image source={home} style={styles.menuIcon} />

          </TouchableOpacity>

          <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate('CustemerScreen')}>
          <Image source={custemer} style={styles.menuIcon} />

          </TouchableOpacity>

          <TouchableOpacity style={styles.menu} onPress={() => this.props.navigation.navigate('TambahScreen')}>
            <Image source={tambah} style={styles.menuIcon} />
          </TouchableOpacity>

        </View>
          </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  containerMain: {
    flex: 1,

  },
  title: {

    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#0040ff'
  },
  subTitle: {
    backgroundColor: '#0040ff',
    color: 'black',
    fontSize: 20,
    paddingBottom: 1,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#0040ff',
    paddingVertical: 12,
    flexDirection: 'row',
    flex: 0.05,

  },
  menu:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  menuIcon:{
    tintColor: '#000',
    height: 30,
    width: 30,
  },
  menuIconSelected:{
    color: '#0040ff',
    textAlign: 'center'
  },
  isian: {
    //backgroundColor: 'rgba(255,255,255, .6)',
    width: '100%',
    padding: 10,
    fontSize: 15,
    color: '#000'
  },
  judul: {
    padding: 1,
    paddingBottom: 30,
    fontSize: 20,
    color: '#000',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#01579b',
    alignItems: 'center',
    borderRadius: 12,
    margin: 20,
    justifyContent: 'center',
  }
});

export default TambahScreen;
