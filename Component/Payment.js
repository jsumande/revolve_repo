import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import { Alert,Platform,ActivityIndicator,Modal,Text,View,TouchableOpacity } from 'react-native';
import * as RNIap from 'react-native-iap';
import AwesomeAlert from 'react-native-awesome-alerts';
import NetInfo from "@react-native-community/netinfo";


const itemSkus = Platform.select({
    ios: [
      'ae.picasso.revolvemasterunlock',
      // 'product.Revolve.Master.unlock',
      // 'product.Revolve.Master.unlock', // dooboolab
    ],
    android: [
      //   'com.color.product_1',
      // 'com.gameduet.game_sample',
      // 'com.gameduet.game_unlock',
      'ae.picasso.revolve.gamepurchase',
      // 'android.test.canceled',
      // 'android.test.refunded',
      // 'android.test.purchased',
      // 'point_1000', '5000_point', // dooboolab
    ],
  });

  let purchaseUpdateSubscription;

class Payment extends Component {
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
        showRestore : false,
        successRestore : false,
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
    this.setState({loading_indicator: true})
    if(Platform.OS == 'android'){
      const purchases = await RNIap.getAvailablePurchases();
      const purchases1 = await RNIap.consumePurchaseAndroid(purchases[0].purchaseToken);
      AsyncStorage.removeItem('Game_Purchase')
      this.setState({successRestore: true})
    }
    else{
      // const purchases = await RNIap.clearProductsIOS();
      const purchases = await RNIap.getAvailablePurchases();
      const purchases1 = await RNIap.consumePurchase(purchases.purchaseToken);
      // const purchases = await RNIap.clearProducts();
      // const purchases1 = await RNIap.consumePurchaseAndroid(purchases[0].purchaseToken);

      // purchases.forEach(purchase => {
      //   switch (purchase.productId) {
      //   case 'ae.picasso.revolvemasterunlock':
      //     newState.premium = true
      //     restoredTitles.push('Premium Version');
      //     break
      //   }
      // })

      AsyncStorage.removeItem('Game_Purchase')
      this.setState({successRestore: true})
    }

    setTimeout(() => {
      this.setState({loading_indicator: false, successRestore : false });
    }, 2000);

    setTimeout(() => {
      this.props.navigate.reset({ index: 1, routes: [{ name: 'Landing' }], })
    }, 2500);

  }

  async componentDidMount() {

    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
  
      this.getItems()

      const purchases = await RNIap.purchaseUpdatedListener(
        
        async (purchase: InAppPurchase | SubscriptionPurchase) => {
          
          const receipt = purchase.transactionReceipt;
          
          // const token = await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
          if (Platform.OS === 'ios') {
            await RNIap.finishTransactionIOS(purchase.transactionId);
            AsyncStorage.setItem('Game_Purchase',"Purchased");
          } else if (Platform.OS === 'android') {
            
            await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
            AsyncStorage.setItem('Game_Purchase',"Purchased");
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


          <AwesomeAlert
          show={this.state.showRestore}
          showProgress={false}
          title="Notice"
          message="Refund Purchase Game Unlock"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Close"
          confirmText="Confirm"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.setState({ showRestore : false,})
          }}
          onConfirmPressed={() => {
            this.restore()
          }}
        />

        <AwesomeAlert
          show={this.state.successRestore}
          showProgress={false}
          title="Notice"
          message="Successfully Refunded"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          cancelText="Close"
          confirmText="Confirm"
          confirmButtonColor="#DD6B55"

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

     
        <View style={{flexDirection:'column',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
          {global.purchases_status == 0 ?
          <View style={{ width:'100%',alignSelf:'center' }}>
              <TouchableOpacity  onPress={() => { this.game_checker() } } style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
                  <Text style={{textAlign:'center',color:'white'}}>Revolve Master Game Unlock</Text>
              </TouchableOpacity>  
              </View>
          :
              // <TouchableOpacity disabled={true} style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
              
              //     <Text style={{textAlign:'center',color:'white'}}>Game Already Purchased</Text>
              // </TouchableOpacity>

              <TouchableOpacity  onPress={() => { this.setState({ showRestore : true, }) }} style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
                  <Text style={{textAlign:'center',color:'white'}}>Restore Game Purchase</Text>
              </TouchableOpacity>
          }

            {/* <TouchableOpacity  onPress={() =>this.restore()} style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
                  <Text style={{textAlign:'center',color:'white'}}>Restore</Text>
              </TouchableOpacity> { this.setState({ showRestore : true }) }    * /}
             
              {/* <TouchableOpacity  onPress={() => this.sample() } style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
                  <Text style={{textAlign:'center',color:'white'}}>Display</Text>
              </TouchableOpacity>   */}
             
        </View>
      </View> 
  
    );
  }
}

export default Payment;


// {productList.map((product, i) => {
//   return (

//           <View key={i} style={{flexDirection:'row',justifyContent:'space-around',marginLeft:10,marginRight:10}}>
      
//       {/* {this.state.avail == true ? */}
//       {global.purchases_status == 0 ?
//       // { this.state.avail2[0].status == true ? 
//       <View style={{ width:'100%',alignSelf:'center' }}>
//           <TouchableOpacity  onPress={() =>this.requestPurchase(product.productId)} style={{backgroundColor:'#480582',alignSelf:'center',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
//               <Text style={{textAlign:'center',color:'white'}}>Revolve Master Game Unlock</Text>
//           </TouchableOpacity>  
//           </View>
//       :
//           <TouchableOpacity disabled={true} style={{backgroundColor:'#480582',width:'90%',padding:10,borderRadius:8,marginBottom:15}}>
//               {/* <Text style={{textAlign:'center',color:'white'}}>Game Already Purchased</Text> */}
//               <Text style={{textAlign:'center',color:'white'}}>{ productList[0].productId  }</Text>
//           </TouchableOpacity>
//       }

//   </View>
//   );
// })}