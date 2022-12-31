'use strict';

import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView,Image,ImageBackground,Dimensions,Animated ,Easing  } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import * as RNIap from 'react-native-iap';
import Setting from './Setting';
import SoundPlayer from 'react-native-sound-player'
import Lock_Component from './Lock_Component'
import MusicComponent from './MusicComponent'
import Swiper from 'react-native-swiper'

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
const SCREEN_WIDTH = Dimensions.get("window").width;

export default class Level_Stage extends Component {
    _onFinishedPlayingSubscription = null
    constructor(){
        global.level_select = '';
        super();
        
        this.state = {

          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,
          level_score : [],
          direction  : 0,
          star : 0,
          // level_animation: new Animated.Value(0),
          music : null,
          audio : global.Game_Audio,
          config : {
            velocityThreshold: 0.01,
            directionalOffsetThreshold: 50000000000000000000000000000000000000000,
            gestureIsClickThreshold : 1
          },
          

          // UI Variable
          Upper_Tab : {},
          Level_Tab : {},
          disable_left : true,
          SCREEN_WIDTH : Dimensions.get("window").width,
          xOffset : new Animated.Value(0),

          // Animated
          count_tab : {data : 0},
          level_animation : [
            { data  : new Animated.Value(0)},
            { data  : new Animated.Value(0)},
            { data  : new Animated.Value(0)},
            { data  : new Animated.Value(0)},
            { data  : new Animated.Value(0)},
            { data  : new Animated.Value(0)},
          ]

        }
    }

    gameStage = (level,checker) => {

        // if(global.Game_Audio_Clip == 'Enabled'){var whoosh = new Sound('bubble.wav', Sound.MAIN_BUNDLE, (error) => {whoosh.play((success) => {});whoosh.setVolume(1);});}
        
        // if(level >=1 && level <=2){this.props.navigation.reset({ index: 2, routes: [{ name: 'Onex2' }], }, global.stage_select = 1  ) }
        // else if(level >=3 && level <=5){this.props.navigation.reset({ index: 2, routes: [{ name: 'Onex3' }], }, global.stage_select = 1  ) }
        // else if(level >=6 && level <=10){this.props.navigation.reset({ index: 2, routes: [{ name: 'Twox2' }], }, global.stage_select = 1  ) }
        // else if(level >=11 && level <=20){this.props.navigation.reset({ index: 2, routes: [{ name: 'Twox3' }], }, global.stage_select = 1  ) }
        // else if(level >=21 && level <=30){this.props.navigation.reset({ index: 2, routes: [{ name: 'Twox3' }], }, global.stage_select = 2  ) }
        // else if(level >=31 && level <=40){this.props.navigation.reset({ index: 2, routes: [{ name: 'Threex3' }], }, global.stage_select = 2  ) }
        // else if(level >=41 && level <=50){this.props.navigation.reset({ index: 2, routes: [{ name: 'Threex3' }], }, global.stage_select = 3  ) }
        // else if(level >=51 && level <=60){this.props.navigation.reset({ index: 2, routes: [{ name: 'Threex4' }], }, global.stage_select = 3  ) }
        // else if(level >=61 && level <=80){this.props.navigation.reset({ index: 2, routes: [{ name: 'Threex4' }], }, global.stage_select = 4  ) }
        // else if(level >=81 && level <=100){this.props.navigation.reset({ index: 2, routes: [{ name: 'Threex5' }], }, global.stage_select = 5  ) }
        // else{
        
        // }

        // global.level_select = level;

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
      this.props.navigation.reset({ index: 3, routes: [{ name: 'Game_loader' }], }, global.stage_select = stage,global.route = routes   );
        
    }

      get_star = () => {
        setInterval(() => {
          AsyncStorage.getItem("level_star_score")
          .then(value => {
            let string = JSON.parse(value)
            global.level_score = string;
       
          })
        .done();
        },2000)
      }

      star = (star) => {

        let stars = [];
        let Level_Tab = this.state.Level_Tab;

        for(let i = 0;i< star;i++){
          stars.push(
            <Image source={require('./img/star.png')} style={{width:Level_Tab.star_width,height:Level_Tab.star_height,margin:2}} />
          );
        }

        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'row',backgroundColor:'#606060',borderBottomLeftRadius:12,borderBottomRightRadius:12}}>
                {stars}
          </View>
        
        );
      }

      componentWillUnmount() {
        this.setState({ music : null });
        global.music = "music2.mp3";
        SoundPlayer.stop()
      }

      componentDidMount(){

          
          this.size();
          // this.get_star()
          this.first_stage()
          this.second_stage()
          this.third_stage()
          this.forth_stage()
          this.fifth_stage()

          let datas = {data:"0"};
          if(global.stage_select == 0) {



              if(global.level_score[20].unlock == 1 && global.level_score[40].unlock == 0 && global.level_score[60].unlock == 0 && global.level_score[80].unlock == 0) { this.setState({direction : 2}); datas['data'] = 2; }
              else if(global.level_score[20].unlock == 1 && global.level_score[40].unlock == 1 && global.level_score[60].unlock == 0 && global.level_score[80].unlock == 0) { this.setState({direction : 3}); datas['data'] = 3; }
              else if(global.level_score[20].unlock == 1 && global.level_score[40].unlock == 1 && global.level_score[60].unlock == 1 && global.level_score[80].unlock == 0) { this.setState({direction : 4}); datas['data'] = 4; }
              else if(global.level_score[20].unlock == 1 && global.level_score[40].unlock == 1 && global.level_score[60].unlock == 1 && global.level_score[80].unlock == 1) { this.setState({direction : 5}); datas['data'] = 5; }
              else {this.setState({direction : 1}); datas['data'] = 1; }

              this.setState({ count_tab : datas });

              Animated.timing(this.state.level_animation[datas['data']].data , {
                toValue : 1,
                duration : 800,
                useNativeDriver : true,
                easing: Easing.quad
              }).start();
              
          }
          else{
            this.setState({direction : global.stage_select})
            datas['data'] = global.stage_select;
            Animated.timing(this.state.level_animation[datas['data']].data , {
              toValue : 1,
              duration : 800,
              useNativeDriver : true,
              easing: Easing.quad
            }).start();
            this.setState({ count_tab : datas });
          }

         
          
          let sample = 0;

          for(let i = 0; i < global.level_score.length;i++){
            sample+= global.level_score[i].star;
          }
          this.setState({star : sample})

        
          if(this.state.audio == 'Enabled'){
            // SoundPlayer.playSoundFile('music', 'mp3')
            this.setState({ music : true })
            console.log("Enable music");
          }

      }

      fade  () {
        // Animated.timing(this.state.level_animation , {
        //   toValue : 1,
        //   duration : 1500,
        //   useNativeDriver : true
        // }).start();
        console.log(this.state.count_tab['data'] + " swipe");
        // for(let i = 1;i < this.state.level_animation.length;i++){
        //     Animated.timing(this.state.level_animation[this.state.count_tab['data']].data , {
        //     toValue : 1,
        //     duration : 400,
        //     useNativeDriver : true,
        //     easing: Easing.quad
        //   }).start();
        // }

      }

      async direction (direction) {


        let config = {
          velocityThreshold: 0.01,
            directionalOffsetThreshold: 50000000000000000000000000000000000000000,
            gestureIsClickThreshold : 1
        };
        this.setState({config : config});
        

          switch(direction){
            case 'left' :
                if(this.state.direction == 5){
                  this.setState({direction : 5}); 
                  let datas = {data:this.state.direction}; 
                  // datas['data'] = 5; 
                  this.state.count_tab['data'] = 5;
                  // this.setState({ count_tab : datas });
                  
                }
                else {
                  this.setState({direction : this.state.direction + 1});
                  let datas = {data:this.state.direction}; 
                  // datas['data'] = this.state.direction + 1; 
                  this.state.count_tab['data'] = this.state.direction + 1;
                  // this.setState({ count_tab : datas });
                }

                this.fade();
                
            break;

            case 'right':
              if(this.state.direction == 1){
                this.setState({direction : 1}); 
                let datas = {data:this.state.direction}; 
                // datas['data'] = 1; 
                // this.setState({ count_tab : datas });
                this.state.count_tab['data'] =  1;
               
    
              }
              else {
                this.setState({direction : this.state.direction - 1});
                let datas = {data:this.state.direction}; 
                this.state.count_tab['data'] = this.state.direction - 1;
             
                // this.setState({ count_tab : datas }); 
  
              }
              this.fade();

            break;
          }



          


          
      }

      first_stage = () => {

        let Level_Tab = this.state.Level_Tab;

        let stage = [];

        for(let i = 1; i <= 20;i++){
            stage.push(
              global.level_score[i-1].unlock == 1 ? 
                <TouchableOpacity onPress={ () => this.gameStage(i)}>
                 <View style={{width: wp('21%'),height:Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
                      <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                      {this.star(global.level_score[i-1].star)}
                 </View>
                </TouchableOpacity>
              :
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

      second_stage = () => {

        let Level_Tab = this.state.Level_Tab;

        let stage = [];

        for(let i = 21; i <= 40;i++){
          stage.push(
            global.level_score[i-1].unlock == 1 ? 
              <TouchableOpacity onPress={ () => this.gameStage(i)}>
               <View style={{width: wp('21%'),height:  Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
                    <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                    {this.star(global.level_score[i-1].star)}
               </View>
              </TouchableOpacity>
            :
            <View style={{width: wp('21%'),height:  Level_Tab.level_height,backgroundColor: '#5aa469',margin:5,borderRadius:15,justifyContent: 'center',alignItems:'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
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

      third_stage = () => {

        let Level_Tab = this.state.Level_Tab;


        let stage = [];

        for(let i = 41; i <= 60;i++){
          stage.push(
            global.level_score[i-1].unlock == 1 ? 
            <TouchableOpacity onPress={ () => this.gameStage(i)}>
            <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
                 <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                 {this.star(global.level_score[i-1].star)}
            </View>
           </TouchableOpacity>
          :
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

      forth_stage = () => {

        let Level_Tab = this.state.Level_Tab;

        let stage = [];
        for(let i = 61; i <= 80;i++){
          stage.push(

            global.purchases_status == 0 ? 
            // <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: 'black',margin:5,borderRadius:15,justifyContent: 'center',alignItems:'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
            //   <Image source={require('./img/lock.png')} style={{width:wp('8%'),height:hp('6%'),margin:2}} />
            //   <Text style={{color:'white',fontSize:wp('5%')}}>locked</Text>
            // </View>

            <Lock_Component Level_Tab={Level_Tab}></Lock_Component>
             :

            global.level_score[i-1].unlock == 1 ? 
              <TouchableOpacity onPress={ () => this.gameStage(i)}>
               <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
                    <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                    {this.star(global.level_score[i-1].star)}
               </View>
              </TouchableOpacity>
            :
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


      fifth_stage () {

        let Level_Tab = this.state.Level_Tab;

        let stage = [];

        for(let i = 81; i <= 100;i++){
          stage.push(

            global.purchases_status == 0 ? 
            // <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: 'black',margin:5,borderRadius:15,justifyContent: 'center',alignItems:'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
            //   <Image source={require('./img/lock.png')} style={{width:wp('8%'),height:hp('6%'),margin:2}} />
            //   <Text style={{color:'white',fontSize:wp('5%')}}>locked</Text>
            // </View>

            <Lock_Component Level_Tab={Level_Tab}></Lock_Component>
            :

            global.level_score[i-1].unlock == 1 ? 
              <TouchableOpacity onPress={ () => this.gameStage(i)}>
               <View style={{width: wp('21%'),height: Level_Tab.level_height,backgroundColor: '#a8e20c',margin:5,borderRadius:15,justifyContent: 'center',borderWidth:Level_Tab.level_border,borderColor:'white'}}>
                    <Text style={{color:'#3a3a3a',alignSelf:'center',fontSize:hp('3%'),paddingBottom:Level_Tab.padding_bottom,paddingTop:5}}>{i}</Text>
                    {this.star(global.level_score[i-1].star)}
               </View>
              </TouchableOpacity>
            :
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


    

    render() {

      const config = {
        velocityThreshold: 0.01,
        directionalOffsetThreshold: 50000000000000000000000000000000000000000
      };

      const  Upper_Tab  = this.state.Upper_Tab;


      return (
        <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./img/bg1.png')} style={styles.container}>
          {
            this.state.music ? <MusicComponent musictype={this.state.music}></MusicComponent>  : null 
          }

        <View style={{flexDirection:'row',width: wp('100%'),alignItems:'center',justifyContent:'center'}}>

            <TouchableOpacity style={styles.HeaderOpacity} disabled={true}>
                <Image source={require('./img/Top_Long_Blue.png')} style={styles.HeaderOpacity,{width: Upper_Tab.Blue,height: hp('8%'),resizeMode: 'stretch'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.HeaderOpacity} disabled={true}>
                <Image source={require('./img/Top_Medium_Purple.png')} style={{width: Upper_Tab.Purple,height: hp('8%'),resizeMode: 'stretch'}} />
            </TouchableOpacity>

          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('./img/star.png')} style={{width:wp('9%'),height:hp('5%'),marginTop:'5%'}} />
            <Text style={{color:'white',position:'relative',top:'8%',fontSize:wp('7%'),fontWeight:'bold'}}> X {this.state.star}</Text>
          </View>

            

        </View>
            
              {/* <GestureRecognizer  onSwipeLeft={(state) => this.direction("left")} onSwipeRight={(state) => this.direction("right")} config={this.state.config}>
                  <SafeAreaView style={{width:wp('100%'),height:hp('80%'),}}>

                 
                      {this.state.direction == 1 ? this.first_stage() : null}
                      {this.state.direction == 2 ? this.second_stage() : null}
                      {this.state.direction == 3 ? this.third_stage() : null}
                      {this.state.direction == 4 ? this.forth_stage() : null}
                      {this.state.direction == 5 ? this.fifth_stage() : null}

                  <View style={{flexDirection:'row',flexWrap:'wrap',alignSelf:'center'}}>

                  {
                    this.state.direction == 1 ? <Text style={{textAlign:'center',marginTop:'0%',color:'#a8e20c',fontSize:wp('11%')}}>•</Text> : <Text style={{textAlign:'center',marginTop:'0%',color:'#9b9b9b',fontSize:wp('11%')}}>•</Text>
                  }
                  {
                    this.state.direction == 2 ? <Text style={{textAlign:'center',marginTop:'0%',color:'#a8e20c',fontSize:wp('11%')}}>•</Text> : <Text style={{textAlign:'center',marginTop:'0%',color:'#9b9b9b',fontSize:wp('11%')}}>•</Text>
                  }
                  {
                    this.state.direction == 3 ? <Text style={{textAlign:'center',marginTop:'0%',color:'#a8e20c',fontSize:wp('11%')}}>•</Text> : <Text style={{textAlign:'center',marginTop:'0%',color:'#9b9b9b',fontSize:wp('11%')}}>•</Text>
                  }
                  {
                    this.state.direction == 4 ? <Text style={{textAlign:'center',marginTop:'0%',color:'#a8e20c',fontSize:wp('11%')}}>•</Text> : <Text style={{textAlign:'center',marginTop:'0%',color:'#9b9b9b',fontSize:wp('11%')}}>•</Text>
                  }
                  {
                    this.state.direction == 5 ? <Text style={{textAlign:'center',marginTop:'0%',color:'#a8e20c',fontSize:wp('11%')}}>•</Text> : <Text style={{textAlign:'center',marginTop:'0%',color:'#9b9b9b',fontSize:wp('11%')}}>•</Text>
                  }
                  
                  </View>


                  </SafeAreaView>
              </GestureRecognizer> */}


            <Swiper index={this.state.direction - 1} showsButtons={false}>
              <View>
                {this.first_stage()}
              </View>

              <View >
                {this.second_stage()}
              </View>

              <View>
                {this.third_stage()}
              </View>

              <View>
                {this.forth_stage()}
              </View>

              <View>
                {this.fifth_stage()}
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