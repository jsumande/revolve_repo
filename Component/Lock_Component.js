import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import { Image,Platform,ActivityIndicator,Modal,Text,View,TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as RNIap from 'react-native-iap';
import AwesomeAlert from 'react-native-awesome-alerts';
import NetInfo from "@react-native-community/netinfo";


const itemSkus = Platform.select({
    ios: [
      'ae.picasso.revolvemasterunlock',
      'product.Revolve.Master.unlock',
      // 'product.Revolve.Master.unlock', // dooboolab
    ],
    android: [
     
      'ae.picasso.revolve.gamepurchase',
    //   'android.test.purchased',
     
    ],
  });

  let purchaseUpdateSubscription;

class Lock_Component extends Component {
  constructor(props) {
    super(props);

    this.state = {
        productList: [],
        receipt: '',
        availableItemsMessage: '',
        avail : true,
        avail2 : [{ status : true } ],
        showDialog : false,
        showDialog_offline : false,
        loading_indicator : false,
        sample : false,
        data : [],
      };
  }

  async sample () {
    const purchases = await RNIap.getAvailablePurchases();
    console.log(purchases);
    this.setState( { data : purchases[0]  , sample : true } )
  }

  redirect = () => {
    
    this.props.navigate.reset({ index: 1, routes: [{ name: 'Landing' }], })
  }

  async restore () {

    if(Platform.OS == 'android'){
      const purchases = await RNIap.getAvailablePurchases();
      const purchases1 = await RNIap.consumePurchaseAndroid(purchases[0].purchaseToken);
      AsyncStorage.removeItem('Game_Purchase')
     
    }
    else{
      const purchases = await RNIap.clearTransactionIOS();
      AsyncStorage.removeItem('Game_Purchase')
     
    }

  }

  async componentDidMount() {

    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
  
      this.getItems()

      const purchases = await RNIap.purchaseUpdatedListener(
        
        async (purchase: InAppPurchase | SubscriptionPurchase) => {
          
          const receipt = purchase.transactionReceipt;
          
          AsyncStorage.setItem('Game_Purchase',"Purchased");
          // const token = await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          if (Platform.OS === 'ios') {
            await RNIap.finishTransactionIOS(purchase.transactionId);
          } else if (Platform.OS === 'android') {
            
            await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
   
          }
          await RNIap.finishTransaction(purchase, false);
        },
      );

    } catch (err) {
      console.warn(err.code, err.message);
      
    }

  }

 
  getItems = async () => {
 
    try {
      const products = await RNIap.getProducts(itemSkus);
   
      this.setState({productList: products});

    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  requestPurchase = async (sku) => {
    try {
      // RNIap.requestPurchase(sku);
      const purchases =  await RNIap.requestPurchase(sku);

      if(purchases){
        this.setState({ showDialog : true , loading_indicator : false });
      }
      else{
        console.log("cancel");
      }
    } catch (err) {
      // console.warn(err.code, err.message);
      console.log(err.message)
      // err.message == "Payment is Cancelled."
      if(err.message){
        this.setState({ loading_indicator : false })
      }
    }
  };

  componentWillUnmount(){
    RNIap.endConnection();
  }


  game_checker = () => {
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);

      if(state.isConnected) {
        this.requestPurchase(itemSkus[0] )
        this.setState({ loading_indicator : true })
        // this.setState( {  showDialog : true  } )
      }
      else {
        this.setState( {  showDialog_offline : true  } )
      }

      // this.setState({ ads_connection : state.isConnected});
    });
  }


  render() {

    const {productList, receipt, availableItemsMessage} = this.state;
    const receipt100 = receipt.substring(0, 100);


    return (
     
      <View >

      <AwesomeAlert
          show={this.state.showDialog_offline}
          showProgress={false}
          title="Internet Issue"
          message="Please Connect to the Internet"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Close"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setState({ showDialog_offline : false, })
          }}
          onConfirmPressed={() => {
            this.setState({ showDialog_offline : false, })
          }}
        />


        <AwesomeAlert
          show={this.state.showDialog}
          showProgress={false}
          title="Apply Changes"
          message="Game needs to restart!"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Restart, Now!"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setState({ showDialog : false, })
          }}
          onConfirmPressed={() => {
            this.redirect()
          }}
        />
  
          <Modal transparent={true} visible={this.state.loading_indicator} animationType="fade">
            <View style={{flex:1}}>
              <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                  <View style={{width:'60%',borderBottomWidth:1,borderTopRightRadius:8,borderTopLeftRadius:8}}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}>Loading</Text>
                  </View>

              </View>
            </View>
          </Modal>


          <Modal transparent={true} visible={this.state.sample} animationType="fade">
            <View style={{flex:1}}>
              <View style={{backgroundColor:'rgba(0,0,0,0.8)',flex: 1,justifyContent:'center',alignItems:'center'}}>

                  <View style={{width:'60%',borderBottomWidth:1,borderTopRightRadius:8,borderTopLeftRadius:8}}>
                    <ActivityIndicator size="large" color="white" />
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}> { this.state.data.purchaseToken }</Text>
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}> { this.state.data.transactionId }</Text>
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}> { this.state.data.purchaseToken }</Text>
                    <Text style={{color:'white',textAlign:'center',paddingTop:15,paddingBottom:15,fontSize:15}}> { this.state.data.transactionId }</Text>
                    <TouchableOpacity  onPress={() => this.setState( { sample : false } )} style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
                        <Text style={{textAlign:'center',color:'white'}}>Close</Text>
                    </TouchableOpacity>  

                  </View>

              </View>
            </View>
          </Modal>

     
            <TouchableOpacity  onPress={() => { this.game_checker() } } style={{width: wp('21%'),height: this.props.Level_Tab.level_height,backgroundColor: 'black',margin:5,borderRadius:15,justifyContent: 'center',alignItems:'center',borderWidth:this.props.Level_Tab.level_border,borderColor:'white'}}>
              <Image source={require('./img/lock.png')} style={{width:wp('8%'),height:hp('6%'),margin:2}} />
              <Text style={{color:'white',fontSize:wp('5%')}}>locked</Text>
            </TouchableOpacity>
      </View> 
  
    );
  }
}

export default Lock_Component;
