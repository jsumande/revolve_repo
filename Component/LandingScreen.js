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

export default class LandingScreen extends Component {

    constructor(){
        super();
        global.stage_select = 0;
        global.level_score = [];
        global.purchases_status = 0;
        global.purchases_checker = 1;
        global.sample = [];
        this.state = {
          Pause_modalVisible: false,
          Setting_modalVisible: false,
          level_stages : true,
          appState: AppState.currentState,
          music : null,
          loading : 0,
        }
      }
      

      componentWillUnmount() {
        RNIap.endConnection();
      }

      getPurchaseUpdatedListener = async ()=> {
        try {
          const purchases = await RNIap.purchaseUpdatedListener(
      
            async (purchase: InAppPurchase | SubscriptionPurchase) => {
    
              const receipt = purchase.transactionReceipt;
              // console.log(receipt);
              if (purchase) {
                global.purchases_status = 1;
              }  
            },
          );
        
    
        } catch (err) {
          console.warn(err.code, err.message);
        }
      };

      
      getAvailablePurchases = async () => {
      try {
        console.info(
          'Get available purchases (non-consumable or unconsumed consumable)',
        );
        const purchases = await RNIap.getAvailablePurchases();
        // console.info('Available purchases :: ', purchases);
        // console.log(purchases);
        if (purchases && purchases.length > 0) {
          global.purchases_status = 1;
        }
      } catch (err) {
        console.warn(err.code, err.message);
       
      }
    };



      async componentDidMount() {
       
        admob().setRequestConfiguration({  maxAdContentRating: MaxAdContentRating.PG, tagForChildDirectedTreatment: true,tagForUnderAgeOfConsent: true,})
        .then(() => {});

        try {
          const result = await RNIap.initConnection();
          await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
          // this.getAvailablePurchases()
        } catch (err) {
          console.warn(err.code, err.message);
        }


        // try {
        //   const purchases = await RNIap.purchaseUpdatedListener(
      
        //     async (purchase: InAppPurchase | SubscriptionPurchase) => {
    
        //       const receipt = purchase.transactionReceipt;
        //       global.sample = purchase.transactionReceipt;


              
        //     },
        //   );
        
    
        // } catch (err) {
        //   console.warn(err.code, err.message);
        // }

        // Game Purchase Status Start
        AsyncStorage.getItem("Game_Purchase")
        .then(value => {
          if(!value){

            this.getAvailablePurchases()

          }
          else{

            global.purchases_checker = 1;
            global.purchases_status = 1;

          }
        })
      .done();
        // Game Purchase Status End

        // Game Score  Start 
        AsyncStorage.getItem("level_star_score")
        .then(value => {
          if(!value){
            let array = [{stage : 0,star : 0,unlock:1}];
            for(let i = 1;i < 101;i++){
              array.push({stage : i,star : 0,unlock:0});
            }
            let string = JSON.stringify(array);
            AsyncStorage.setItem('level_star_score',string);
            global.level_score = array;
         
          }
          else{
            let string = JSON.parse(value)
            global.level_score = string;
     
          }
        })
      .done();

      // Game Score  End 

      // Game audio Group Start 
      AsyncStorage.getItem("Game_Audio_Clip")
        .then(value => {
          if(!value){

            AsyncStorage.setItem('Game_Audio_Clip','Enabled');
            global.Game_Audio_Clip = 'Enabled';
           
          }
          else{
            global.Game_Audio_Clip = value;

          }
        })
      .done();

      AsyncStorage.getItem("Game_Audio")
        .then(value => {
          if(!value){
  
            AsyncStorage.setItem('Game_Audio','Enabled');
            global.Game_Audio = 'Enabled';
            let random = Math.floor(Math.random() * 2) + 1;
            if(random == 1) this.setState({music : 'bg1'});
            else { this.setState({music : 'bg2'});}
          
          }
          else{
            global.Game_Audio = value;
            if(value == 'Enabled'){
              this.setState({ music : true })
            }
         
          }
        })
      .done();

     // Game audio Group End 

     this._interval = setInterval( () => {
        this.setState( { loading : this.state.loading + 0.8  })
        if(this.state.loading > 1) { clearInterval(this._interval); this.props.navigation.reset({ index: 1,routes: [{ name: 'Level_Stage' }],}); } 
      },1000);

      
  }

      componentWillUnmount() {
      //  clearInterval(this._interval); 
      // SoundPlayer.pause()
    }

      render(){
        
        return(
          <SafeAreaView style={{flex:9}}>
            <ImageBackground source={require('./img/bg1.png')} style={styles.container}>
              {
               this.state.music ? <MusicGameComponent musictype={this.state.music}></MusicGameComponent>  : null 
              }
              {/* GroundTest */}
              <View style={{flex:5,justifyContent : "center",alignItems : "center",}}>


              {/* {this.state.loading > 1 ? 
                 
                  
                  
                  <View>
                      <TouchableOpacity onPress={() => {this.props.navigation.reset({ index: 1,routes: [{ name: 'Level_Stage' }],})} }>
                        <Image source={require('./img/play.png')} style={styles.img} />
                      </TouchableOpacity> 

                      <TouchableOpacity onPress={() => {this.props.navigation.reset({ index: 2,routes: [{ name: 'GroundTests' }],})} }>
                        <Image source={require('./img/play.png')} style={styles.img} />
                      </TouchableOpacity> 
                  </View>
                  
                  :

               

                  <View>
                      <Text style={{ alignSelf:'center' ,marginBottom:'3%' ,color:'white' ,fontSize:hp('3%') }}>Loading</Text>
                      <Progress.Bar animationType={'timing'} useNativeDriver={true} borderColor={'white'} animated={true} progress={this.state.loading} width={wp('70%')} height={hp('1%')} color={'#a5e24d'} /> 
                  </View>
              } */}

                  <View>
                      <Text style={{ alignSelf:'center' ,marginBottom:'3%' ,color:'white' ,fontSize:hp('3%') }}>Loading</Text>
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