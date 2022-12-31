import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView ,Image,Platform,Dimensions,AppState } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SoundPlayer from 'react-native-sound-player'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import NetInfo from "@react-native-community/netinfo";


const Ads = Platform.select({
  ios: [
    'ca-app-pub-3850267799543797/8916479606',
  ],
  android: [
    'ca-app-pub-3850267799543797/2734214636',
  ],
});




export default class Setting extends Component {

    constructor(){
      
        super();
        this.state = {
          Pause_modalVisible: false,
          Setting_modalVisible: false,
          ads_connection : global.purchases_status == 0 ? true : false,
          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,
          Menu_width : 0,
         
        }
      }
    
      Setting_modalView = () => {
        this.setState({
          Setting_modalVisible:true,
        })
      }
    
      close_Setting_modalView = () => {
        this.setState({
          Setting_modalVisible:false,
        })
      }
    
      Pause_modalView = () => {
        this.setState({
          Pause_modalVisible:true,
        })
      }
    
      close_Pause_modalView = () => {
        this.setState({
          Pause_modalVisible:false,
        })
      }

      check_connection = () => {
        NetInfo.fetch().then(state => {
          // console.log("Connection type", state.type);
          // console.log("Is connected?", state.isConnected);

          // this.setState({ ads_connection : state.isConnected});
        });
      } 

    
      componentDidMount = () => {
      
        this.size();
        
      }

      size = () => {

    
  
        let aspectRatio  = this.state.height / this.state.width;
      

        if(aspectRatio>1.6) {
  
          // Code for Iphone
          this.setState({ Menu_width :  '90%' });
    
       
        }
        else {

          // Code for Ipad
          this.setState({ Menu_width :  '50%' });
        }
  
      }
      
    render(){
      const  Menu_width  = this.state.Menu_width;
      
        return(
            <SafeAreaView style={{flex:1}}>


                {/* Pause */}
        <Modal
          // animationType="slide"
          transparent={true}
          visible={this.state.Pause_modalVisible}
        >
          <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(0,0,0,0.3)',flex: 1,justifyContent:'center',alignItems:'center'}}>

            <View style={{backgroundColor:'#fec230',width:Menu_width,borderBottomWidth:1,borderBottomColor:"#faf562",borderTopRightRadius:8,borderTopLeftRadius:8}}>
            <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:5,fontSize:wp('8%')}}>Level {global.level_select}</Text>
              <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Pause Menu</Text>
            </View>

              <View style={{backgroundColor:'rgba(255,255,255,0.9)',width:Menu_width,paddingBottom:10,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>
                
                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10,margin:10}}>

                    <TouchableOpacity style={{backgroundColor:'#480582',width:'100%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => {this.props.navigate.reset({index: 1,routes: [{ name: 'Level_Stage' }],}),SoundPlayer.pause(),  this.setState({Pause_modalVisible:false,}) }}>
                      <Text style={{textAlign:'center',color:'white'}}>Return to Game Level</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>

                    <TouchableOpacity style={{backgroundColor:'#a5e24d',width:'70%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.close_Pause_modalView()}>
                      <Text style={{textAlign:'center',color:'white'}}>Close</Text>
                    </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </Modal>
        

          <View style={{flex:1,flexDirection:'row',width:'100%',marginLeft : 'auto',marginRight : 'auto',top:hp('4%'),}}>

            <TouchableOpacity onPress={() => this.Pause_modalView()} style={styles.TouchableOpacityStyle2}>
              <Image source={require('./img/pause.png')} style={styles.pause} />
            </TouchableOpacity>

          </View>


          {this.state.ads_connection ? 
            <BannerAd unitId={Ads[0]} size={BannerAdSize.SMART_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: true,}}
            onAdLoaded={() => { this.setState({ads_connection : true}),console.log('Loaded');}} onAdFailedToLoad={(error) => { this.setState({ads_connection : false}),console.log("Error")}}/> : 

              <View style={{flex:1,}}></View>
          }

          


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
  
    pause :{
      width : hp('10%'),
      height : hp('10%'),
    },
  
    setting :{
      width : hp('10%'),
      height : hp('10%'),
    },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },

    TouchableOpacityStyle: {
      position: 'absolute',
      right: hp('1%'),
      bottom: hp('4%'),
   },

   TouchableOpacityStyle2: {
      position: 'absolute',
      left: hp('1%'),
      bottom: hp('4%'),
   },
  
  });