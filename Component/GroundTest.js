import React, { Component } from "react";
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView,Image,ImageBackground,Dimensions,Animated ,Easing  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper'
import Setting from './Setting';

const SCREEN_WIDTH = Dimensions.get("window").width;

export default class GroundTest extends Component {

  constructor(){
    super();
    this.state = {
      Upper_Tab : {},
      Level_Tab : {},
    }
  }


  first_stage = () => {

    let Level_Tab = this.state.Level_Tab;

    let stage = [];

    for(let i = 1; i <= 20;i++){
        stage.push(
          // global.level_score[i-1].unlock == 1 ? 
          //   <TouchableOpacity onPress={ () => this.gameStage(i)}>
          //    <View style={{width: wp('21%'),height:Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
          //         <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                  
          //    </View>
          //   </TouchableOpacity>
          // :
          <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: '#5aa469',margin:5,borderRadius:15,justifyContent: 'center',alignItems:'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
              <Image source={require('./img/lock.png')} style={{width:wp('8%'),height:hp('6%'),margin:2}} />
              <Text style={{color:'white',fontSize:wp('5%')}}>{i}</Text>
           </View>
          )
    }

      return(
        <View style={{flex:1,}}>                 
            <View style={{paddingTop:wp('8%'),flexDirection:'row',width:'100%',justifyContent: 'center',marginLeft : 'auto',marginRight : 'auto',flexWrap:'wrap',}}>
                {stage}  
            </View>                  
        </View> 
      );
  }

  size = () => {

    
  
    let aspectRatio  = this.state.height / this.state.width;
   

    let Upper_Tab = this.state.Upper_Tab;
    let Level_Tab = this.state.Level_Tab;

    Upper_Tab = { 

      "Blue" : 0,
      "Purple" : 0,
      
    };

    Level_Tab = {
      "level_height" : 0,
      "level_border" : 0,
      "padding_bottom" : 0,
      "star_height" : 0,
      "star_width" : 0,
    };


    if(aspectRatio>1.6) {

      // Code for Iphone

      // Upper_Tab
      Upper_Tab.Blue = wp('90%');
      Upper_Tab.Purple = wp('65%');
      
      // Level_Tab
      Level_Tab.level_height = hp('11%');
      Level_Tab.level_border = 3;
      Level_Tab.padding_bottom = hp('1%');
      Level_Tab.star_height = wp('5%');
      Level_Tab.star_width = hp('2%');

      this.setState({ Upper_Tab : Upper_Tab , Level_Tab : Level_Tab });

 
   
    }
    else {

      // Code for Ipad

      // Upper_Tab
      Upper_Tab.Blue = wp('70%');
      Upper_Tab.Purple = wp('55%');
      
      // Level_Tab
      Level_Tab.level_height = hp('11.9%');
      Level_Tab.level_border = 5;
      Level_Tab.padding_bottom = hp('1.5%');
      Level_Tab.star_height = wp('5%');
      Level_Tab.star_width = hp('4%');


      this.setState({ Upper_Tab : Upper_Tab , Level_Tab : Level_Tab });
    }

  }

  componentDidMount(){

          
    this.size();
    this.first_stage();
   
  }

  render() {
    return (
    <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./img/bg1.png')} style={styles.container}>
       
          <Swiper style={styles.wrapper} index={1} showsButtons={false} showsPagination={false}>
            <View style={styles.slide1}>
            {this.first_stage()}
            </View>
            <View style={styles.slide2}>
              {this.first_stage()}
            </View>
            <View style={styles.slide3}>
            {this.first_stage()}
            </View>
          </Swiper>

          
          <Setting navigate={this.props.navigation}></Setting>
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



  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

   HeaderOpacity : {
      position: 'absolute',
      top: 0,
   },

  // ScrollView

  tabStyle: {},
  scrollStyle: {
    backgroundColor: 'rgba(255,255,255,0)',
    paddingLeft: hp('8%'),
    paddingRight: hp('8%'),
    justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 1,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 3,
    backgroundColor: '#480582',
    borderRadius: 3,
  //   width: 15,
  },


  // Swipe

  content:{
    alignItems: 'center',
    marginTop : '10%'
  },
  card:{
    height : hp('70%'),
    backgroundColor: '#480582',
  },
  card1: {
    backgroundColor: '#480582',
  },
  card2: {
    backgroundColor: '#480582',
  },

  TouchableOpacityStyle1: {
  position: 'absolute',
  left: hp('1%'),
  bottom: hp('4%'),
  },

  TouchableOpacityStyle2: {
  position: 'absolute',
  left: hp('1%'),
  bottom: hp('8%'),

  width : hp('8%'),
  backgroundColor: '#3a3a3a',
  borderRadius : hp('2%'),
  borderColor : 'white',
  borderWidth : 1,

  },

  TouchableOpacityStyle3: {
  position: 'absolute',
  right: hp('1%'),
  bottom: hp('8%'),

  width : hp('8%'),
  backgroundColor: '#3a3a3a',
  borderRadius : hp('2%'),
  borderColor : 'white',
  borderWidth : 1,
  },

  setting :{
  width : hp('8%'),
  height : hp('8%'),
  },

  scrollView: {
    flexDirection: "row",
    width:wp('100%'),height:hp('80%'),
  },
  scrollPage: {
    width: SCREEN_WIDTH,
  },

});