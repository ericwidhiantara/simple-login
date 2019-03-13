import React from 'react';
import { StyleSheet,
 Text,
 Button,
 TouchableOpacity,
 View,
 ImageBackground,
 StatusBar,
 Image,
 RefreshControl,
 ListView,
 TextInput,
 Alert, ActivityIndicator
} from 'react-native';
import { StackNavigator } from 'react-navigation';
const home = require('./img/home.png');
const custemer = require('./img/custemer.png');
const tambah = require('./img/tambah.png');
const orang = require('./img/orang.png');
class CustemerScreen extends React.Component {
	static navigationOptions = {
    header: null
 };

   constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      isLoading: true,
      refreshing: false,
    };
  }

  _onRefresh() {
    this.setState({refreshing: true});
    fetch('http://mhs.rey1024.com/appmobile/D1615051109/getData.php')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          refreshing: false,
          dataSource: ds.cloneWithRows(responseJson),
        }, function() {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {

  return fetch('http://mhs.rey1024.com/appmobile/D1615051109/getData.php')
    .then((response) => response.json())
    .then((responseJson) => {
      let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({
        isLoading: false,
        dataSource: ds.cloneWithRows(responseJson),
      }, function() {
        // In this block you can do something with new state.
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
renderRow(record) {
    return (
      <TouchableOpacity activeOpacity={0.7} style={styles.row}>
         <View style={styles.info}>
         <View style={styles.photo}>
         <Image source={orang} style={styles.propil} />
         </View>
         <View style={styles.tulisan}>
          <Text style={styles.Title}>nama : {record.nama}</Text>
          <Text style={styles.Title}>nim : {record.nim}</Text>
          <Text style={styles.Details}>jurusan : {record.jurusan}</Text>
          <Text style={styles.Details}>nohp : {record.nohp}</Text>
          <Text style={styles.Details}>pilihansie : {record.pilihansie}</Text>
          </View>
         </View>

      </TouchableOpacity>
    );
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
              <View style={styles.box}>
        			<Text style={styles.title}>RECRUITMENT KEPANITIAAN FTK</Text>
       				<Text style={styles.subTitle}>Panitia Terdaftar</Text>
                <ListView
                  refreshControl={
                  <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  />
                  }
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow}
                />
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
    marginTop: 25,
    paddingBottom: 5,
    textAlign: 'center',
    backgroundColor: '#BDBDBD'
  },
  subTitle: {
    backgroundColor: '#BDBDBD',
    color: 'black',
    fontSize: 20,
    paddingBottom: 12,
    textAlign: 'center',
  },
  menuContainer: {
    backgroundColor: '#BDBDBD',
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
    color: '#00BCD4',
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
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    height: 35,
    width: 150,
    backgroundColor: '#01579b',
    alignItems: 'center',
    borderRadius: 12,
    margin: 10,
    justifyContent: 'center',
  },
  info: {
    flex: 1,
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255, .6)',
  },
  Title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  Details: {
    color: '#000',
    fontSize: 15,
  },
  photo: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tulisan: {
    flex: 1,
  },
  propil:{
    tintColor: '#000',
    height: '80%',
    width: '70%',
    borderRadius: 50,
  },
  box:{
    flex: 1
  }
});

export default CustemerScreen;
