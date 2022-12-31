import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView ,Image,ImageBackground,AppState } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as RNIap from 'react-native-iap';
import MusicGameComponent from './MusicLandingComponent'
import SoundPlayer from 'react-native-sound-player'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import * as Progress from 'react-native-progress';
const itemSkus = ['com.cooni.point1000','com.cooni.point5000', 'android.test.purchased',];

export default class Game_loader extends Component {

    constructor(){
        super();
        
        this.state = {
          
          appState: AppState.currentState,
          music : null,
          loading : 0,
        }
      }
      
    async componentDidMount() {
       console.log(global.route + " " + global.stage_select);
     this._interval = setInterval( () => {
        this.setState( { loading : this.state.loading + 0.8  })
        if(this.state.loading > 1) { clearInterval(this._interval); this.props.navigation.reset({ index: 3, routes: [{ name: global.route }] });} 
        // this.props.navigation.reset({ index: 3, routes: [{ name: global.route }] });
      },1000);
  
    }

    componentWillUnmount() {
   
    }

      render(){
        
        return(
          <SafeAreaView style={{flex:9}}>
            <ImageBackground source={require('./img/bg1.png')} style={styles.container}>
            
              <View style={{flex:5,justifyContent : "center",alignItems : "center",}}>
         
                <View>
                    <Text style={{ alignSelf:'center' ,marginBottom:'3%' ,color:'white' ,fontSize:hp('3%') }}>Game Loading</Text>
                    <Progress.Bar animationType={'timing'} useNativeDriver={true} borderColor={'white'} animated={true} progress={this.state.loading} width={wp('70%')} height={hp('1%')} color={'#a5e24d'} /> 
                </View>

              </View>

        </ImageBackground>
      </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      resizeMode:'cover',
      flex : 1,
    },
  
    img :{
      width : hp('15%'),
      height : hp('15%'),
        resizeMode: 'stretch',
    },
  
  });