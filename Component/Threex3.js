import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView,Image,ImageBackground,Animated, Dimensions ,Easing  } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SoundPlayer from 'react-native-sound-player';
import  {PanGestureHandler , TapGestureHandler} from 'react-native-gesture-handler'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Setting from './Game_Ads';
import Success from './Success';
import Color from './color/color_3.json';
import MusicGameComponent from './MusicGameComponent'
import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = Platform.select({
  ios: [
    'ca-app-pub-3850267799543797/7206993876',
  ],
  android: [
    'ca-app-pub-3850267799543797/9108051291',
  ],
});



const interstitial = InterstitialAd.createForAdRequest(adUnitId[0]);

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

export default class Threex3 extends Component {

    // SoundPlayer = new SoundPlayer('motorcycle.mp3');
    constructor(){
        super();
    
        this.state = {

          sample : [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample2 : [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample3 : [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],
    
          sample4 : [
    
            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample5 : [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample6: [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample7 : [

            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample8 : [
    
            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          sample9 : [
    
            {position : 0,color: '#',detection : false},
            {position : 1,color: '#',detection : false},
            {position : 2,color: '#',detection : false},
            {position : 3,color: '#',detection : false},
          ],

          circles : [
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 500,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 200,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 200,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 400,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 500,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 700,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 500,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 600,rotateInterpolate : '',animatedStyle : ''},
            {degrees : 360,color1:'',color2:'',color3:'',color4:'',match : 0,duration : 500,rotateInterpolate : '',animatedStyle : ''},
          ],

          matches : [
            {match : 0},{match : 0},{match : 0},{match : 0},{match : 0},{match : 0},
            {match : 0},{match : 0},{match : 0},{match : 0},{match : 0},{match : 0},
          ],

          GameStart : null,
          config : {
            velocityThreshold: 0.001,
            directionalOffsetThreshold: 80,
            gestureIsClickThreshold : 1
          },

          Popout_modalVisible: false,
          Popout2_modalVisible: false,
          popout_name : '',
    

          degrees : 0,
          degrees2 : 0,
          direction_axis : null,

          width : Dimensions.get('window').width,
          height : Dimensions.get('window').height,

          total_move : 0,
          scoring : 0,
          star : 0,
          disable : false,
          music : null,

          screen : 0,
          screen_config : {
            main: 0,
            sub_main : 0,
            color_main : 0,
            cm_distance : 0,
            padding_top : 0,
          },

          
          // Score Popout
          number : 0,
          score_popout : false,
          popout_text : null,
          popout_finish : null,
          first_swipe : null,

          // UI Variable
          Upper_Tab : {},
        }
      }

      randomStage = () => {
        this.props.navigation.reset({
          index: 1,
          routes: [{ name: 'Interstitial' }],
        });
      }

      onLeft = (gestureState,data) => {
        this.setState({ first_swipe : true });
        let sample = 0;
        // sample = this.state.circles[data].degrees - 90; this.startAnimation(sample,data,0);
        if(this.state.direction_axis.y >= 50 ) {sample = 0;sample = this.state.circles[data].degrees + 90; this.startAnimation(sample,data,1);}
        else {sample = 0;sample = this.state.circles[data].degrees - 90; this.startAnimation(sample,data,0);}

      }
    
      onRight = (gestureState,data) => {
        this.setState({ first_swipe : true });
        let sample = 0;
        // sample = this.state.circles[data].degrees + 90; this.startAnimation(sample,data,1);
        if(this.state.direction_axis.y >= 50 ) {sample = 0;sample = this.state.circles[data].degrees - 90; this.startAnimation(sample,data,0);}
        else {sample = 0;sample = this.state.circles[data].degrees + 90; this.startAnimation(sample,data,1);}
      }

      onUp =  (gestureState,data) => {
        this.setState({ first_swipe : true });
        let sample = 0;
        if(this.state.direction_axis.x >= 50 ) {sample = 0;sample = this.state.circles[data].degrees - 90; this.startAnimation(sample,data,0);}
        else {sample = 0;sample = this.state.circles[data].degrees + 90; this.startAnimation(sample,data,1);}
      }

      onDown =  (gestureState,data) => {
        this.setState({ first_swipe : true });
        let sample = 0;
        if(this.state.direction_axis.x >= 50 ) {sample = 0;sample = this.state.circles[data].degrees + 90; this.startAnimation(sample,data,1);}
        else {sample = 0;sample = this.state.circles[data].degrees - 90; this.startAnimation(sample,data,0);}
      }


      startAnimation = (sample,data,position) => {
        if(!this.state.disable){
        let config = {
          velocityThreshold: 0.001,
          directionalOffsetThreshold: 80,
          gestureIsClickThreshold : 1
        };
        this.setState({total_move : this.state.total_move + 1,config : config});

        if(global.Game_Audio_Clip == 'Enabled'){
          SoundPlayer.playSoundFile('bubble', 'mp3');SoundPlayer.setVolume(1)
        }
        
        setTimeout( () => {this.detection(data,sample,position)},5); Animated.timing(this.state.circles[data].animatedStyle,{toValue:sample,duration:230,useNativeDriver: true,easing: Easing.elastic(1)}).start( ({finished}) => {});

        }
      }

      checker = () => {
      }
      
      detection = (data,circle,swipe) => {
        let ar = this.state.circles;
        var a = null;
        ar[data].degrees = circle;
    
        var match = null;
        var match2 = null;
    
        var match3 = null;
        var match4 = null;
    
        var match5 = null;
        var match6 = null;
    
        var match7 = null;
        var match8 = null;
    
        switch(swipe){
          case 0 :
    
          if(data == 0){  a = this.state.sample;a.push(a.shift()); this.setState({circles:ar,sample:a},this.checker());}
          if(data == 1){  a = this.state.sample2;a.push(a.shift()); this.setState({circles:ar,sample2:a},this.checker());}
          if(data == 2){  a = this.state.sample3;a.push(a.shift()); this.setState({circles:ar,sample3:a},this.checker());}
          if(data == 3){  a = this.state.sample4;a.push(a.shift()); this.setState({circles:ar,sample4:a},this.checker());}
          if(data == 4){  a = this.state.sample5;a.push(a.shift()); this.setState({circles:ar,sample5:a},this.checker());}
          if(data == 5){  a = this.state.sample6;a.push(a.shift()); this.setState({circles:ar,sample6:a},this.checker());}
          if(data == 6){  a = this.state.sample7;a.push(a.shift()); this.setState({circles:ar,sample7:a},this.checker());}
          if(data == 7){  a = this.state.sample8;a.push(a.shift()); this.setState({circles:ar,sample8:a},this.checker());}
          if(data == 8){  a = this.state.sample9;a.push(a.shift()); this.setState({circles:ar,sample9:a},this.checker());}
          
          break;
    
          case 1 :
    
          if(data == 0){ a = this.state.sample;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample:a},this.checker());}
          if(data == 1){ a = this.state.sample2;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample2:a},this.checker());}
          if(data == 2){ a = this.state.sample3;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample3:a},this.checker());}
          if(data == 3){ a = this.state.sample4;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample4:a},this.checker());}
          if(data == 4){ a = this.state.sample5;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample5:a},this.checker());}
          if(data == 5){ a = this.state.sample6;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample6:a},this.checker());}
          if(data == 6){ a = this.state.sample7;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample7:a},this.checker());}
          if(data == 7){ a = this.state.sample8;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample8:a},this.checker());}
          if(data == 8){ a = this.state.sample9;a.unshift(a[3]); a.pop(); this.setState({circles:ar,sample9:a},this.checker());}

          break;
    
        }
      
      } 
      
      componentDidMount(){

        console.log(global.level_select);

        this.size();
        let rotateInterpolates = '';
        let animatedStyles = this.state.circles;


        let circles = this.state.circles;
        let sample = this.state.sample;
        let sample2 = this.state.sample2;
        let sample3 = this.state.sample3;
        let sample4 = this.state.sample4;
        let sample5 = this.state.sample5;
        let sample6 = this.state.sample6;
        let sample7 = this.state.sample7;
        let sample8 = this.state.sample8;
        let sample9 = this.state.sample9;

        // let random = Math.floor(Math.random() * 5);
        let random = global.level_select - 31;
        // let random = 14;
        console.log("set "+random);


        circles[0].color1 = Color.set_color_1[random].circle_1.color_1;
        circles[0].color2 = Color.set_color_1[random].circle_1.color_2;
        circles[0].color3 = Color.set_color_1[random].circle_1.color_3;
        circles[0].color4 = Color.set_color_1[random].circle_1.color_4;

        circles[1].color1 = Color.set_color_1[random].circle_2.color_1;
        circles[1].color2 = Color.set_color_1[random].circle_2.color_2;
        circles[1].color3 = Color.set_color_1[random].circle_2.color_3;
        circles[1].color4 = Color.set_color_1[random].circle_2.color_4;

        circles[2].color1 = Color.set_color_1[random].circle_3.color_1;
        circles[2].color2 = Color.set_color_1[random].circle_3.color_2;
        circles[2].color3 = Color.set_color_1[random].circle_3.color_3;
        circles[2].color4 = Color.set_color_1[random].circle_3.color_4;

        circles[3].color1 = Color.set_color_1[random].circle_4.color_1;
        circles[3].color2 = Color.set_color_1[random].circle_4.color_2;
        circles[3].color3 = Color.set_color_1[random].circle_4.color_3;
        circles[3].color4 = Color.set_color_1[random].circle_4.color_4;

        circles[4].color1 = Color.set_color_1[random].circle_5.color_1;
        circles[4].color2 = Color.set_color_1[random].circle_5.color_2;
        circles[4].color3 = Color.set_color_1[random].circle_5.color_3;
        circles[4].color4 = Color.set_color_1[random].circle_5.color_4;

        circles[5].color1 = Color.set_color_1[random].circle_6.color_1;
        circles[5].color2 = Color.set_color_1[random].circle_6.color_2;
        circles[5].color3 = Color.set_color_1[random].circle_6.color_3;
        circles[5].color4 = Color.set_color_1[random].circle_6.color_4;

        circles[6].color1 = Color.set_color_1[random].circle_7.color_1;
        circles[6].color2 = Color.set_color_1[random].circle_7.color_2;
        circles[6].color3 = Color.set_color_1[random].circle_7.color_3;
        circles[6].color4 = Color.set_color_1[random].circle_7.color_4;

        circles[7].color1 = Color.set_color_1[random].circle_8.color_1;
        circles[7].color2 = Color.set_color_1[random].circle_8.color_2;
        circles[7].color3 = Color.set_color_1[random].circle_8.color_3;
        circles[7].color4 = Color.set_color_1[random].circle_8.color_4;

        circles[8].color1 = Color.set_color_1[random].circle_9.color_1;
        circles[8].color2 = Color.set_color_1[random].circle_9.color_2;
        circles[8].color3 = Color.set_color_1[random].circle_9.color_3;
        circles[8].color4 = Color.set_color_1[random].circle_9.color_4;


        sample[0].color = circles[0].color1;
        sample[1].color = circles[0].color2;
        sample[2].color = circles[0].color3;
        sample[3].color = circles[0].color4;

        sample2[0].color = circles[1].color1;
        sample2[1].color = circles[1].color2;
        sample2[2].color = circles[1].color3;
        sample2[3].color = circles[1].color4;

        sample3[0].color = circles[2].color1;
        sample3[1].color = circles[2].color2;
        sample3[2].color = circles[2].color3;
        sample3[3].color = circles[2].color4;

        sample4[0].color = circles[3].color1;
        sample4[1].color = circles[3].color2;
        sample4[2].color = circles[3].color3;
        sample4[3].color = circles[3].color4;

        sample5[0].color = circles[4].color1;
        sample5[1].color = circles[4].color2;
        sample5[2].color = circles[4].color3;
        sample5[3].color = circles[4].color4;

        sample6[0].color = circles[5].color1;
        sample6[1].color = circles[5].color2;
        sample6[2].color = circles[5].color3;
        sample6[3].color = circles[5].color4;

        sample7[0].color = circles[6].color1;
        sample7[1].color = circles[6].color2;
        sample7[2].color = circles[6].color3;
        sample7[3].color = circles[6].color4;

        sample8[0].color = circles[7].color1;
        sample8[1].color = circles[7].color2;
        sample8[2].color = circles[7].color3;
        sample8[3].color = circles[7].color4;

        sample9[0].color = circles[8].color1;
        sample9[1].color = circles[8].color2;
        sample9[2].color = circles[8].color3;
        sample9[3].color = circles[8].color4;

        for(let i = 0;i < this.state.circles.length;i++){

          this.state.circles[i].animatedStyle = new Animated.Value(0);

          rotateInterpolates = this.state.circles[i].animatedStyle.interpolate ({
            inputRange : [0,90],
            outputRange : ["0deg","90deg"],
          });

          animatedStyles[i].rotateInterpolate = {
            transform:[{rotate:rotateInterpolates}]
          }

          Animated.timing(this.state.circles[i].animatedStyle,{
              toValue:this.state.circles[i].degrees,
              duration:this.state.circles[i].duration,
              useNativeDriver: true,
              easing: Easing.elastic(0.7)
          }).start( ({finished}) => { })
        }
        
        this.checker()
        if(global.Game_Audio == 'Enabled'){
          let music_random = Math.floor(Math.random() * 4) + 1;
          if(random == 1) this.setState({music : 'music'});
          else if(random == 2) this.setState({music : 'music2'});
          else if(random == 3) this.setState({music : 'music3'});
          else { this.setState({music : 'music4'});}
          console.log(music_random);
        }
        
        const eventListener = interstitial.onAdEvent(type => {
          console.log(interstitial.loaded + " " + "checker");
        
          if(type === AdEventType.CLOSED) {
            console.log("hello ads");
            this.audio();
            
          }
        
        });

        if(global.purchases_status == 0) interstitial.load()
      }

      audio = () => {
        this.setState({Popout2_modalVisible:true,})

        let random = Math.floor(Math.random() * 4);
          let popout_name  = "";
          console.log(random  + " Image Selected");
          switch(random){
            case 0 : popout_name = require('./img/popout/good.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('good1', 'wav');} break;
            case 1 : popout_name = require('./img/popout/hmm.png');  if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('mmm1', 'wav');}  break;
            case 2 : popout_name = require('./img/popout/nice.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('nice1', 'wav');}  break;
            default : popout_name = require('./img/popout/yeah.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('yeah1', 'wav');} break;
          }
          this.setState({popout_finish : popout_name });
          // var whoosh = new Sound('welldone1.mp3', Sound.MAIN_BUNDLE, (error) => {whoosh.play((success) => {});whoosh.setVolume(1);});
          
        setTimeout(()=>{
          this.setState({Popout2_modalVisible:false,})
        }, 3000); 
    
        setTimeout(()=>{
          this.setState({Popout_modalVisible:true,})
          // interstitial.load();
        }, 3300); 
      }

      modal(data,data2) {
        global.level_score[global.level_select].unlock = 1;
        if(this.state.total_move <=15) { global.level_score[global.level_select - 1].star = 3; this.setState({star : 3}) }
        else if(this.state.total_move <=20 && this.state.total_move >=16){ 
          this.setState({star : 2}) 
          if(global.level_score[global.level_select - 1].star <= 2)global.level_score[global.level_select - 1].star = 2;
        }
        else{ 
          this.setState({star : 1}) 
          if(global.level_score[global.level_select - 1].star <= 1)global.level_score[global.level_select - 1].star = 1;
        }

        let string = JSON.stringify(global.level_score)
        AsyncStorage.setItem('level_star_score',string);
        // console.log(string);

        if(interstitial.loaded == false) { 

          setTimeout(()=>{
            this.setState({Popout2_modalVisible:true,})
            let random = Math.floor(Math.random() * 4);
            let popout_name  = "";
            console.log(random  + " Image Selected");
            switch(random){
              case 0 : popout_name = require('./img/popout/good.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('good1', 'wav');} break;
              case 1 : popout_name = require('./img/popout/hmm.png');  if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('mmm1', 'wav');}  break;
              case 2 : popout_name = require('./img/popout/nice.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('nice1', 'wav');}  break;
              default : popout_name = require('./img/popout/yeah.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('yeah1', 'wav');} break;
            }
            this.setState({popout_finish : popout_name });
    
          }, 1500);

          
        setTimeout(()=>{
          this.setState({Popout2_modalVisible:false,})
        }, 3000); 
    
        setTimeout(()=>{
          this.setState({Popout_modalVisible:true,})
        }, 3300); 
        }

        else{
          setTimeout(()=>{
            interstitial.show();
  
          }, 1000);
        }

      }
    
      checker = () => {

        var score = null;

        var match = null;
        var match2 = null;
    
        var match3 = null;
        var match4 = null;
    
        var match5 = null;
        var match6 = null;
    
        var match7 = null;
        var match8 = null;

        var match9 = null;
        var match10 = null;

        var match11 = null;
        var match12 = null;

        var match13 = null;
        var match14 = null;

        var match15 = null;
        var match16 = null;

        var match17 = null;
        var match18 = null;

        var match19 = null;
        var match20 = null;

        var match21 = null;
        var match22 = null;

        var match23 = null;
        var match24 = null;

        let number = 0;

        // First
        if(this.state.sample[1].color == this.state.sample2[3].color){
          var total = this.state.matches; 
          if(global.Game_Audio_Clip == 'Enabled' && total[0].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          total[0].match = 1; 
          match = this.state.sample;match[this.state.sample[1].position].detection = true;match[this.state.sample[3].position].detection = false;
          match2 = this.state.sample2;match2[this.state.sample2[3].position].detection = true;match2[this.state.sample2[1].position].detection = false;
        }
        else{
          var total = this.state.matches; total[0].match = 0; 
          match = this.state.sample;match[this.state.sample[1].position].detection = false;match[this.state.sample[3].position].detection = false;
          match2 = this.state.sample2;match2[this.state.sample2[3].position].detection = false;match2[this.state.sample2[1].position].detection = false;
        }
    
        // Second
        if(this.state.sample3[3].color == this.state.sample2[1].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[1].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[1].match = 1; 
          match5 = this.state.sample3;match5[this.state.sample3[3].position].detection = true;match5[this.state.sample3[1].position].detection = false;
          match6 = this.state.sample2;match6[this.state.sample2[1].position].detection = true;
        }
        else{
          var total = this.state.matches; total[1].match = 0; 
          match5 = this.state.sample3;match5[this.state.sample3[3].position].detection = false;match5[this.state.sample3[1].position].detection = false;
          match6 = this.state.sample2;match6[this.state.sample2[1].position].detection = false;
        }

        // Third
        if(this.state.sample[2].color == this.state.sample4[0].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[2].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[2].match = 1; 
          match3 = this.state.sample;match3[this.state.sample[2].position].detection = true;match3[this.state.sample[0].position].detection = false;
          match4 = this.state.sample4;match4[this.state.sample4[0].position].detection = true;match4[this.state.sample4[2].position].detection = false;
        }
        else{
          var total = this.state.matches; total[2].match = 0; 
          match3 = this.state.sample;match3[this.state.sample[2].position].detection = false;match3[this.state.sample[0].position].detection = false;
          match4 = this.state.sample4;match4[this.state.sample4[0].position].detection = false;match4[this.state.sample4[2].position].detection = false;
        }

        // Forth
        if(this.state.sample4[1].color == this.state.sample5[3].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[3].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[3].match = 1; 
          match7 = this.state.sample4;match7[this.state.sample4[1].position].detection = true;match7[this.state.sample4[3].position].detection = false;
          match8 = this.state.sample5;match8[this.state.sample5[3].position].detection = true;match8[this.state.sample5[0].position].detection = false;
        }
        else{
          var total = this.state.matches; total[3].match = 0; 
          match7 = this.state.sample4;match7[this.state.sample4[1].position].detection = false;match7[this.state.sample4[3].position].detection = false;
          match8 = this.state.sample5;match8[this.state.sample5[3].position].detection = false;match8[this.state.sample5[1].position].detection = false;
        }

        // Fifth
        if(this.state.sample2[2].color == this.state.sample5[0].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[4].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[4].match = 1; 
          match9 = this.state.sample2;match9[this.state.sample2[2].position].detection = true;match9[this.state.sample2[0].position].detection = false;
          match10 = this.state.sample5;match10[this.state.sample5[0].position].detection = true;match10[this.state.sample5[2].position].detection = false;
        }
        else{
          var total = this.state.matches; total[4].match = 0; 
          match9 = this.state.sample2;match9[this.state.sample2[2].position].detection = false;match9[this.state.sample2[0].position].detection = false;
          match10 = this.state.sample5;match10[this.state.sample5[0].position].detection = false;match10[this.state.sample5[2].position].detection = false;
        }

        // Sixth
        if(this.state.sample5[1].color == this.state.sample6[3].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[5].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[5].match = 1; 
          match11 = this.state.sample6;match11[this.state.sample6[3].position].detection = true;match11[this.state.sample6[1].position].detection = false;
          match12 = this.state.sample5;match12[this.state.sample5[1].position].detection = true;
        }
        else{
          var total = this.state.matches; total[5].match = 0; 
          match11 = this.state.sample6;match11[this.state.sample6[3].position].detection = false;match11[this.state.sample6[1].position].detection = false;
          match12 = this.state.sample5;match12[this.state.sample5[1].position].detection = false;
        }

        // Seventh
        if(this.state.sample3[2].color == this.state.sample6[0].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[6].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[6].match = 1; 
          match13 = this.state.sample3;match13[this.state.sample3[2].position].detection = true;match13[this.state.sample3[0].position].detection = false;
          match14 = this.state.sample6;match14[this.state.sample6[0].position].detection = true;match14[this.state.sample6[2].position].detection = false;
        }
        else{
          var total = this.state.matches; total[6].match = 0;
          match13 = this.state.sample3;match13[this.state.sample3[2].position].detection = false;match13[this.state.sample3[0].position].detection = false;
          match14 = this.state.sample6;match14[this.state.sample6[0].position].detection = false;match14[this.state.sample6[2].position].detection = false;
        }

        // Eigth
        if(this.state.sample4[2].color == this.state.sample7[0].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[7].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[7].match = 1;
          match15 = this.state.sample7;match15[this.state.sample7[0].position].detection = true;match15[this.state.sample7[2].position].detection = false;
          match16 = this.state.sample4;match16[this.state.sample4[2].position].detection = true;
        }
        else{
          var total = this.state.matches; total[7].match = 0;
          match15 = this.state.sample7;match15[this.state.sample7[0].position].detection = false;match15[this.state.sample7[2].position].detection = false;
          match16 = this.state.sample4;match16[this.state.sample4[2].position].detection = false;
        }

        // Ninth
        if(this.state.sample7[1].color == this.state.sample8[3].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[8].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[8].match = 1;
          match17 = this.state.sample7;match17[this.state.sample7[1].position].detection = true;match17[this.state.sample7[3].position].detection = false;
          match18 = this.state.sample8;match18[this.state.sample8[3].position].detection = true;match18[this.state.sample8[1].position].detection = false;
        }
        else{
          var total = this.state.matches; total[8].match = 0; 
          match17 = this.state.sample7;match17[this.state.sample7[1].position].detection = false;match17[this.state.sample7[3].position].detection = false;
          match18 = this.state.sample8;match18[this.state.sample8[3].position].detection = false;match18[this.state.sample8[1].position].detection = false;
        }

        // Tenth
        if(this.state.sample8[0].color == this.state.sample5[2].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[9].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[9].match = 1;
          match19 = this.state.sample8;match19[this.state.sample8[0].position].detection = true;match19[this.state.sample8[2].position].detection = false;
          match20 = this.state.sample5;match20[this.state.sample5[2].position].detection = true;
        }
        else{
          var total = this.state.matches; total[9].match = 0;
          match19 = this.state.sample8;match19[this.state.sample8[0].position].detection = false;match19[this.state.sample8[2].position].detection = false;
          match20 = this.state.sample5;match20[this.state.sample5[2].position].detection = false;
        }

        // Eleventh
        if(this.state.sample9[3].color == this.state.sample8[1].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[10].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[10].match = 1;
          match21 = this.state.sample9;match21[this.state.sample9[3].position].detection = true;match21[this.state.sample9[1].position].detection = false;
          match22 = this.state.sample8;match22[this.state.sample8[1].position].detection = true;
        }
        else{
          var total = this.state.matches; total[10].match = 0;
          match21 = this.state.sample9;match21[this.state.sample9[3].position].detection = false;match21[this.state.sample9[1].position].detection = false;
          match22 = this.state.sample8;match22[this.state.sample8[1].position].detection = false;
        }

        // Twelveth
        if(this.state.sample9[0].color == this.state.sample6[2].color){
          if(global.Game_Audio_Clip == 'Enabled' && total[11].match == 0) { SoundPlayer.playSoundFile('sparkle', 'wav');SoundPlayer.setVolume(1); number+=1;} 
          var total = this.state.matches; total[11].match = 1; 
          match23 = this.state.sample9;match23[this.state.sample9[0].position].detection = true;match23[this.state.sample9[2].position].detection = false;
          match24 = this.state.sample6;match24[this.state.sample6[2].position].detection = true;
        }
        else{
          var total = this.state.matches; total[11].match = 0;
          this.setState({GameStart:"Start"});
          match23 = this.state.sample9;match23[this.state.sample9[0].position].detection = false;match23[this.state.sample9[2].position].detection = false;
          match24 = this.state.sample6;match24[this.state.sample6[2].position].detection = false;
        }

        
        if(this.state.first_swipe) { this.number(number); }
        
        for(let i = 0;i< this.state.matches.length;i++){
          score +=this.state.matches[i].match;
        }
        this.setState({scoring : score})
        if(score == this.state.matches.length) {this.setState({GameStart:"Start",disable:true},this.modal('sweet',require('./img/popout/sweet.png')));}

      }

          
      number = (number) => {
        console.log(number + " number output ");
        

        if(number >0) {

          if(number >=2) {  this.setState({number : number})}
          else { this.setState({number : this.state.number+=1}) }
          
          console.log(this.state.number+ " number sequence ");

          if(this.state.number >=2){

            let random = Math.floor(Math.random() * 4);
            let popout_name  = "";
            console.log(random  + " Image Selected");
            switch(random){
              case 0 : popout_name = require('./img/popout/good.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('good1', 'wav');} break;
              case 1 : popout_name = require('./img/popout/hmm.png');  if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('mmm1', 'wav');}  break;
              case 2 : popout_name = require('./img/popout/nice.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('nice1', 'wav');}  break;
              default : popout_name = require('./img/popout/yeah.png'); if(global.Game_Audio_Clip == 'Enabled'){ SoundPlayer.playSoundFile('yeah1', 'wav');} break;
            }
              
              this.setState({score_popout : true , popout_text : popout_name });
              setTimeout(()=>{
                this.setState({score_popout : false})
              }, 600); 
          }

          
        }
        else{ this.setState({number : 0}); console.log(this.state.number+ " number sequence ");  }
       
        
        
      }

      size = () => {

       
        let data = this.state.screen_config;

        let aspectRatio  = this.state.height / this.state.width;
        console.log(aspectRatio );

        console.log(hp("20") + " " + wp('40'));

        let Upper_Tab = this.state.Upper_Tab;

        Upper_Tab = { 
  
          "Blue" : 0,
          "Purple" : 0,
          
        };

        if(hp("13%") > wp("27%")) { 

          data.main =  wp("27%");
          data.sub_main = wp('22%');
          data.color_main =  wp('10%');
          data.cm_distance =  wp('15%');        
          data.padding_top = wp("40%");
        }
        else {  
          data.cm_distance = hp('7.3%');
          data.color_main = hp('5%');
          data.main =  hp("13%");
          data.sub_main = hp('11%');
          data.padding_top = hp("20%");  
        }

        if(aspectRatio>1.6) {

          // Code for Iphone
                  
          // Upper_Tab
          Upper_Tab.Blue = wp('90%');
          Upper_Tab.Purple = wp('65%');
          

          this.setState({ Upper_Tab : Upper_Tab  });

          if(hp("14%") > wp("28")) {
            this.setState({screen : 100})
          }
          else{
            this.setState({screen : 90})
          }
       
        }
        else {
          
        // Upper_Tab
        Upper_Tab.Blue = wp('70%');
        Upper_Tab.Purple = wp('55%');
        

        this.setState({ Upper_Tab : Upper_Tab });
          this.setState({screen : 60})
        }
  
      }


    render(){

      const  screen  = this.state.screen_config;
      const  Upper_Tab  = this.state.Upper_Tab;

        return(
        <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./img/bg1.png')} style={styles.container}>
        {
            this.state.music ? <MusicGameComponent musictype={this.state.music}></MusicGameComponent>  : null 
          }
         {/* Popout */}

        {/* Score PopOut */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.score_popout}
         
        >
          <View style={{flex:1}}>
            <View style={{flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                <Image source={this.state.popout_text} style={{width:wp('50%'),height: hp('9%'),resizeMode: 'stretch'}} />
            </View>
          </View>
        </Modal>

        {/* Well Done PopOut */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.Popout2_modalVisible}
          // visible={true}
        >
          <View style={{flex:1}}>
            <View style={{flex: 1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.3)'}}>
                <Image source={this.state.popout_finish} style={{width:wp('65%'),height: hp('9%'),resizeMode: 'stretch'}} />
            </View>
          </View>
        </Modal>
        {
          this.state.Popout_modalVisible ? <Success navigate={this.props.navigation} star={this.state.star} stage={global.level_select}></Success>  : null 
        }

        <View style={{flexDirection:'row',width:wp('100%'),alignItems:'center',justifyContent:'center'}}>

            <TouchableOpacity style={styles.HeaderOpacity} disabled={true}>
                <Image source={require('./img/Top_Long_Blue.png')} style={styles.HeaderOpacity,{width: Upper_Tab.Blue,height: hp('8%'),resizeMode: 'stretch'}} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.HeaderOpacity} disabled={true}>
                <Image source={require('./img/Top_Medium_Purple.png')} style={{width: Upper_Tab.Purple,height: hp('8%'),resizeMode: 'stretch'}} />
            </TouchableOpacity>

            {/* <Text style={{color:'white',position:'relative',top:hp('1%'),fontSize:wp('7%'),fontWeight:'bold'}}>{this.state.scoring}/{this.state.matches.length}({this.state.total_move})</Text> */}
            {/* <Text style={{color:'white',position:'relative',top:hp('1%'),fontSize:wp('7%'),fontWeight:'bold'}}>{this.state.scoring}/{this.state.matches.length}</Text> */}
            <Text style={{color:'white',position:'relative',top:hp('1%'),fontSize:wp('6%'),fontWeight:'bold'}}>Level {global.level_select}</Text>
        </View>

        <View style={{width:wp(this.state.screen),paddingTop:screen.padding_top,height:hp('80%'),flexDirection:'row',flexWrap:"wrap",marginLeft : 'auto',marginRight : 'auto',justifyContent:'center',}}>

        
        <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'0')} 
             onSwipeRight={(state) => this.onRight(state,'0')} 
              onSwipeUp={(state) => this.onUp(state,'0')}
             onSwipeDown={(state) => this.onDown(state,'0')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[0].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[0].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[0].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[0].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[0].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'1')} 
             onSwipeRight={(state) => this.onRight(state,'1')} 
              onSwipeUp={(state) => this.onUp(state,'1')}
             onSwipeDown={(state) => this.onDown(state,'1')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[1].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample2[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[1].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample2[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[1].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample2[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[1].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample2[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[1].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'2')} 
             onSwipeRight={(state) => this.onRight(state,'2')} 
              onSwipeUp={(state) => this.onUp(state,'2')}
             onSwipeDown={(state) => this.onDown(state,'2')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[2].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample3[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[2].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample3[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[2].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample3[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[2].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample3[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[2].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'3')} 
             onSwipeRight={(state) => this.onRight(state,'3')} 
              onSwipeUp={(state) => this.onUp(state,'3')}
             onSwipeDown={(state) => this.onDown(state,'3')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[3].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample4[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[3].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample4[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[3].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample4[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[3].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample4[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[3].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'4')} 
             onSwipeRight={(state) => this.onRight(state,'4')} 
              onSwipeUp={(state) => this.onUp(state,'4')}
             onSwipeDown={(state) => this.onDown(state,'4')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[4].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample5[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[4].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample5[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[4].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample5[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[4].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample5[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[4].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'5')} 
             onSwipeRight={(state) => this.onRight(state,'5')} 
              onSwipeUp={(state) => this.onUp(state,'5')}
             onSwipeDown={(state) => this.onDown(state,'5')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[5].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample6[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[5].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample6[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[5].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample6[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[5].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample6[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[5].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'6')} 
             onSwipeRight={(state) => this.onRight(state,'6')} 
              onSwipeUp={(state) => this.onUp(state,'6')}
             onSwipeDown={(state) => this.onDown(state,'6')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[6].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample7[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[6].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample7[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[6].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample7[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[6].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample7[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[6].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'7')} 
             onSwipeRight={(state) => this.onRight(state,'7')} 
              onSwipeUp={(state) => this.onUp(state,'7')}
             onSwipeDown={(state) => this.onDown(state,'7')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[7].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample8[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[7].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample8[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[7].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample8[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[7].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample8[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[7].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

         <TapGestureHandler onHandlerStateChange={(evt) => {this.setState({direction_axis : evt.nativeEvent})}}>
            <GestureRecognizer onSwipeLeft={(state) => this.onLeft(state,'8')} 
             onSwipeRight={(state) => this.onRight(state,'8')} 
              onSwipeUp={(state) => this.onUp(state,'8')}
             onSwipeDown={(state) => this.onDown(state,'8')}  config={this.state.config} >
              <Animated.View style={[styles.circle,this.state.circles[8].rotateInterpolate,{width : screen.main,height : screen.main}]}>
                  <View style={{ width: screen.sub_main,height: screen.sub_main,borderRadius: 1000,backgroundColor: '#666666',alignItems:'center',justifyContent:'center' }}>
                      <View style={[this.state.sample9[0].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[8].color1,position:'absolute',bottom:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'0deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={{ width: hp("2%"),height: hp("2%"),borderRadius: 100,backgroundColor: '#480582',position:'absolute',borderWidth:2,borderColor:'white'}}></View>
                      <View style={[this.state.sample9[1].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[8].color2,position:'absolute',left:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'90deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample9[2].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[8].color3,position:'absolute',top:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'180deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                      <View style={[this.state.sample9[3].detection ? styles.sample : styles.sample2,{ width: screen.color_main,height: screen.color_main,backgroundColor: this.state.circles[8].color4,position:'absolute',right:screen.cm_distance,borderWidth:2,borderColor:'white',transform:[{rotate:'270deg'}]}]}><View style={{ width: '15%',height: '20%',borderRadius: hp('1.5%'),backgroundColor: 'white',alignSelf:'flex-end',position:'absolute',top:hp("3%"),right:'10%',transform: [{ rotate: "45deg" }]}}></View></View>
                  </View>
               </Animated.View>
            </GestureRecognizer>
         </TapGestureHandler>

        
          </View>
            
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
      // justifyContent : "center",
      // alignItems : "center",
    },
  
    img :{
        width : 85,
        height : 85,
        resizeMode: 'stretch',
    },

     HeaderOpacity : {
        position: 'absolute',
        top: 0,
     },

     circle: {
      // width: 110,
      // height: 110,
      backgroundColor: "white",
      borderRadius: 100,
      alignItems:'center',
      justifyContent:'center',
    },

    sample : {
      borderTopWidth:0,
      borderBottomLeftRadius: hp('1.5%'),
      borderBottomRightRadius:hp('1.5%'),
     },
  
     sample2 : {
      borderRadius:  hp('1.5%'),
     }
  
  });