import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView ,Image,Platform,Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import SoundPlayer from 'react-native-sound-player'
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';
import NetInfo from "@react-native-community/netinfo";
import Payment from './Payment';

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
          audio : global.Game_Audio,
          audio_clip : global.Game_Audio_Clip,
          changes : false,
          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,
          Menu_width : 0,
        }
      }

      Audio_Cancel = () => {
        this.setState({audio : global.Game_Audio , audio_clip : global.Game_Audio_Clip , changes: false,Pause_modalVisible: false,Setting_modalVisible: false})
      }
 
      Audio_Save = () => {
        AsyncStorage.setItem('Game_Audio',this.state.audio);
        global.Game_Audio = this.state.audio;
        AsyncStorage.setItem('Game_Audio_Clip',this.state.audio_clip)
        global.Game_Audio_Clip = this.state.audio_clip;
        // SoundPlayer.stop()

        setTimeout(()=>{
            this.setState({Pause_modalVisible:false,Setting_modalVisible:false,})
            this.props.navigate.reset({index: 1,routes: [{ name: 'Level_Stage' }],})
          }, 1000); 
      }

      Audio_Setting = () => {
          if(this.state.audio == 'Enabled'){
            this.setState({audio : "Disabled",})
            this.setState({changes: true})
          }
          else{
            this.setState({audio : "Enabled",})
            this.setState({changes: true})
          }
      }

      AudioClip_Setting = () => {
        if(this.state.audio_clip == 'Enabled'){
          this.setState({audio_clip : "Disabled",})
          this.setState({changes: true})
        }
        else{
          this.setState({audio_clip : "Enabled",})
          this.setState({changes: true})
        }

      }
    
      Setting_modalView = () => {
        this.setState({
          Setting_modalVisible:true,
        })
      }
    
      close_Setting_modalView = () => {
       
        if(this.state.changes){
          this.setState({Pause_modalVisible : true,Setting_modalVisible:false,})
        }
        else{
          this.setState({
            Setting_modalVisible:false,
          })
        }
       
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
      
      // const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2047303840176567/3792611056';
      const adUnitId = 'ca-app-pub-3850267799543797/8916479606';
      const  Menu_width  = this.state.Menu_width;
        return(
            <SafeAreaView>
      

        {/* Pause */}
        <Modal
          transparent={true}
          visible={this.state.Pause_modalVisible}
        >
          <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

            <View style={{backgroundColor:'#fec230',width:Menu_width,borderBottomWidth:1,borderBottomColor:"#faf562",borderTopRightRadius:8,borderTopLeftRadius:8}}>
              <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Save Game Changes?</Text>
            </View>

            <View style={{backgroundColor:'rgba(255,255,255,0.9)',width:Menu_width,paddingBottom:10,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>

              <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10,marginTop:10}}>
                  <TouchableOpacity style={{backgroundColor:'#480582',width:'40%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.Audio_Save()}>
                    <Text style={{textAlign:'center',color:'white'}}>Save</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{backgroundColor:'#a5e24d',width:'40%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.Audio_Cancel()}>
                    <Text style={{textAlign:'center',color:'white'}}>Cancel</Text>
                  </TouchableOpacity>
              </View>

              </View>

            </View>
          </View>
        </Modal>

        {/* Setting */}
        <Modal
          // animationType="slide"
          transparent={true}
          visible={this.state.Setting_modalVisible}
        >
  
          <View style={{flex:1}}>
            <View style={{backgroundColor:'rgba(0,0,0,0.3)',flex: 1,justifyContent:'center',alignItems:'center'}}>

            <View style={{backgroundColor:'#fec230',width:Menu_width,borderBottomWidth:1,borderBottomColor:"#faf562",borderTopRightRadius:8,borderTopLeftRadius:8}}>
              <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Setting Menu</Text>
            </View>

              <View style={{backgroundColor:'rgba(255,255,255,0.9)',width:Menu_width,paddingBottom:10,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>

                <Text style={{color:'black',textAlign:'center',paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15,fontSize:14}}>Audio Controller :</Text>

                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
                    <TouchableOpacity style={{backgroundColor:'#480582',width:'90%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.Audio_Setting()}>
                      <Text style={{textAlign:'center',color:'white'}}>Music : {this.state.audio}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10,marginTop:10}}>
                    <TouchableOpacity style={{backgroundColor:'#480582',width:'90%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.AudioClip_Setting()}>
                      <Text style={{textAlign:'center',color:'white'}}>Clip : {this.state.audio_clip}</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{color:'black',textAlign:'center',paddingTop:15,paddingBottom:15,paddingLeft:15,paddingRight:15,fontSize:14}}>Unlock the Game :</Text>


                {/* <View style={{flex:1,marginBottom:50}}> */}
                  <Payment navigate={this.props.navigate} ></Payment>
                {/* </View> */}

                <View style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
                    <TouchableOpacity style={{backgroundColor:'#a5e24d',width:'50%',paddingTop:10,paddingBottom:10,borderRadius:8}} onPress={() => this.close_Setting_modalView()}>
                      <Text style={{textAlign:'center',color:'white'}}>Close</Text>
                    </TouchableOpacity>
                </View>

              </View>
            </View>
          </View>
        </Modal>

          <View style={{flex:1,flexDirection:'row',width:'100%',marginLeft : 'auto',marginRight : 'auto',top:hp('4%'),}}>

            {/* <TouchableOpacity onPress={() => this.Pause_modalView()} style={styles.TouchableOpacityStyle}>
              <Image source={require('./img/pause.png')} style={styles.pause} />
            </TouchableOpacity> */}

            <TouchableOpacity onPress={() => this.Setting_modalView()} style={styles.TouchableOpacityStyle2}>
                <Image source={require('./img/settings.png')} style={styles.setting} />
            </TouchableOpacity>

          </View>


          {this.state.ads_connection ? 
            <BannerAd unitId={Ads[0]} size={BannerAdSize.SMART_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: true,}}
              onAdLoaded={() => { this.setState({ads_connection : true}),console.log('Loaded');}} onAdFailedToLoad={(error) => { this.setState({ads_connection : false}),console.log("Error no ads")}}/> : 

              <View style={{paddingTop:hp('5%')}}></View>
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
    right: hp('5%'),
    bottom: hp('4%'),

 },

});