import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,ImageBackground,SafeAreaView ,Modal,Dimensions,Image } from 'react-native';
import Share from "react-native-share";
import ImgBase64 from './img/ImgBase64.json'
import SoundPlayer from 'react-native-sound-player'
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';


const adUnitId = Platform.select({
  ios: [
    'ca-app-pub-3850267799543797/7206993876',
  ],
  android: [
    'ca-app-pub-3850267799543797/9108051291',
  ],
});


const interstitial = InterstitialAd.createForAdRequest(adUnitId[0], {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});


export default class Success extends Component {

    constructor(){
        super();

        const shareLinkContent = {
          contentType: 'link',
          contentUrl: 'https://www.google.com/',
          contentDescription: 'Facebook sharing is easy!'
          // contentType: 'photo',
          // photos: [{ imageUrl: 'photoUri' }],
        };

        this.state = {
          user : null,
          shareLinkContent: shareLinkContent,
          Success_modalVisible: true,
          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,
          Menu_width : 0,
        }
      }

      ShareScore = async (star) => {

        let stars = null;

        if(star == 1){ stars = ImgBase64.img1;}
        else if(star == 2){ stars = ImgBase64.img2;}
        else if(star == 3){ stars = ImgBase64.img3;}

        let shareOptions = {
          title: 'Revolve Master',
          // message: 'some message',
          url: stars,
          // url : 'https://www.facebook.com/',
          // social: Share.Social.FACEBOOK,
        };
        // Share.shareSingle(shareOptions);
        await Share.open(shareOptions);

      }


      componentDidMount = async()=> {
        // interstitial.onAdEvent(type => {
          
        //   console.log(AdEventType);
        
        //   if (type === AdEventType.ERROR) {
        //     console.log('Error Hello')
        //     this.props.navigate.reset({ index: 1, routes: [{ name: 'Level_Stage' }],},SoundPlayer.playSoundFile('bubble', 'mp3'))
        //   this.setState({Success_modalVisible : false})
        //   }
          
        //   if (type === AdEventType.LOADED) {
        //     console.log('Saw')
        //     // interstitial.show();
        //   }
        
        //   else if(type === AdEventType.CLOSED) {
        //     console.log('Closed')
        //     this.props.navigate.reset({ index: 1, routes: [{ name: 'Level_Stage' }],},SoundPlayer.playSoundFile('bubble', 'mp3'))
        //   }
        
        // });
        // interstitial.load();
        this.size();
      }

      size = () => {

    
  
        let aspectRatio  = this.state.height / this.state.width;
        console.log(aspectRatio );

        if(aspectRatio>1.6) {
  
          // Code for Iphone
          this.setState({ Menu_width :  '90%' });
    
       
        }
        else {

          // Code for Ipad
          this.setState({ Menu_width :  '50%' });
        }
  
      }
  
      star = (star) => {

        let stars = [];

        for(let i = 0;i< star;i++){
          stars.push(
            <Image source={require('./img/star.png')} style={{width:this.state.height / 10,height:this.state.height / 10,}} />
          );
        }

        return(
          <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',marginBottom:15,marginTop:15}}>
                {stars}
          </View>
        
        );
      }


      exit_load =  () => {
        // this.setState({Success_modalVisible : false})
        // if(interstitial.loaded) {
        //   interstitial.show();
        //   interstitial.load();
        //   console.log("Hello world");
        //   }
        this.props.navigate.reset({ index: 1, routes: [{ name: 'Level_Stage' }],},SoundPlayer.playSoundFile('bubble', 'mp3'))
                            this.setState({Success_modalVisible : false})
      }

      next_level = (level) =>{


        let routes = '';
        let stage = '';
       
        
        if(level >=1 && level <=2){ routes = 'Onex2' ; stage= 1; }
        else if(level >=3 && level <=5){ routes = 'Onex3' ; stage= 1;  }
        else if(level >=6 && level <=10){ routes = 'Twox2' ; stage= 1; }
        else if(level >=11 && level <=20){ routes = 'Twox3' ; stage= 1; }
        else if(level >=21 && level <=30){ routes = 'Twox3' ; stage= 2; }
        else if(level >=31 && level <=40){ routes = 'Threex3' ; stage= 2;}
        else if(level >=41 && level <=50){ routes = 'Threex3' ; stage= 3; }
        else if(level >=51 && level <=60){ routes = 'Threex4' ; stage= 3; }
        else if(level >=61 && level <=80){ routes = 'Threex4' ; stage= 4;}
        else if(level >=81 && level <=100){routes = 'Threex5' ; stage= 5; }
        else{
        // }
      }
      global.level_select = level;
      this.props.navigate.reset({ index: 3, routes: [{ name: 'Game_loader' }], }, global.stage_select = stage,global.route = routes   );
    }
      
    render(){
      const  Menu_width  = this.state.Menu_width;
        return(
            <SafeAreaView>

              <Modal transparent={true} visible={this.state.Success_modalVisible} animationType="fade">
                <View style={{flex:1}}>
                  <View style={{backgroundColor:'rgba(0,0,0,0.3)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                  <View style={{backgroundColor:'#fec230',width:Menu_width,borderBottomWidth:1,borderBottomColor:"#faf562",borderTopRightRadius:8,borderTopLeftRadius:8}}>
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:25}}>Congratulations !</Text>
                  </View>

                    <View style={{backgroundColor:'rgba(0,0,0,0.7)',width:Menu_width,paddingBottom:10,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>

                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:15}}>
                            {this.star(this.props.star)}
                      </View>

                      <Text style={{color:'white',textAlign:'center',fontSize:15}}>Game Stage {this.props.stage} Clear</Text>

                      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10}}>
                        
                        {/* <TouchableOpacity style={{backgroundColor:'#3b5998',width:'50%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}} onPress={this.shareLinkWithShareDialog.bind(this)}>
                                <Text style={{textAlign:'center',color:'white'}}>Share Score</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={{backgroundColor:'#3b5998',width:'50%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15,}} onPress={ () => this.ShareScore(this.props.star) }>
                                {/* <Image source={require('./img/FB.png')} style={{width:this.state.height / 15,height:this.state.height / 24,}} /> */}
                                <Text style={{textAlign:'center',color:'white'}}>Share Score</Text>
                        </TouchableOpacity>

                        {this.props.stage >= 100 ? null : <TouchableOpacity style={{backgroundColor:'#008000',width:'100%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}} onPress={() => { this.next_level(this.props.stage + 1) }}>
                            <Text style={{textAlign:'center',color:'white'}}>Continue</Text>
                        </TouchableOpacity> }

                        

                        <TouchableOpacity style={{backgroundColor:'#808000',width:'100%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}} onPress={() => { this.exit_load() }}>
                            <Text style={{textAlign:'center',color:'white'}}>Return Menu</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                </View>
              </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      resizeMode:'cover',
      flex : 1,
      // justifyContent : "center",
      // alignItems : "center",
    },

  
  });