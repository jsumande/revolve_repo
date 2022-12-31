import React, { useEffect, useState } from 'react';
import { SafeAreaView,ActivityIndicator,Text,Modal,TouchableOpacity,View } from 'react-native';
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
import NetInfo from "@react-native-community/netinfo";

// const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-2047303840176567/9956363028';
// const adUnitId = 'ca-app-pub-3850267799543797/7206993876';

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

const Interstitial = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
   
      useEffect(() => {

        NetInfo.fetch().then(state => {

          if(state.isConnected) {
            const eventListener = interstitial.onAdEvent(type => {

              console.log(AdEventType);

              if (type === AdEventType.ERROR) {
                setLoaded(true);
                navigation.navigate('Level_Stage')
                console.log('Error')
              }
              
              if (type === AdEventType.LOADED) {
                setLoaded(true);
                console.log('Saw')
                interstitial.show();
              }
            
              else if(type === AdEventType.CLOSED) {
                setLoaded(true);
                console.log('Closed')
                navigation.navigate('Level_Stage')
              }
              // else {
              //   setLoaded(true);
              //   console.log('Nothing')
              //   navigation.navigate('Level_Stage')
              // }
            });
            interstitial.load();
          }

          else{
            navigation.navigate('Level_Stage')
          }

        })

    }, []);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#131313',justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{color:'white'}}>LOADING...</Text>


        <Modal transparent={true} visible={true} animationType="fade">
                <View style={{flex:1}}>
                  <View style={{backgroundColor:'rgba(0,0,0,0.3)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                  <View style={{backgroundColor:'#fec230',width:'90%',borderBottomWidth:1,borderBottomColor:"#faf562",borderTopRightRadius:8,borderTopLeftRadius:8}}>
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:25}}>Congratulations !</Text>
                  </View>

                    <View style={{backgroundColor:'rgba(0,0,0,0.7)',width:'90%',paddingBottom:10,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>


                      <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginLeft:10,marginRight:10}}>
                        
                        {/* <TouchableOpacity style={{backgroundColor:'#3b5998',width:'50%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}} onPress={this.shareLinkWithShareDialog.bind(this)}>
                                <Text style={{textAlign:'center',color:'white'}}>Share Score</Text>
                        </TouchableOpacity> */}

                        <TouchableOpacity style={{backgroundColor:'#3b5998',width:'50%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}}>
                                <Text style={{textAlign:'center',color:'white'}}>Share Score</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{backgroundColor:'#008000',width:'100%',paddingTop:10,paddingBottom:10,borderRadius:8,marginTop:15}}>
                            <Text style={{textAlign:'center',color:'white'}}>Continue</Text>
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                </View>
              </Modal>
    </SafeAreaView>
  );
}

export default Interstitial;