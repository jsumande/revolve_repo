import React, { Component } from 'react';

import { SafeAreaView,AppState } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
let Sound = require('react-native-sound');
var whoosh = new Sound("music2.mp3", Sound.MAIN_BUNDLE, (error) => {});
export default class MusicGameComponent extends Component {

   
    constructor(props, context) {
      super(props, context);
      

        this.state = {
            appState: AppState.currentState,
           
        }
      }
      
      async componentDidMount() {
        
        AppState.addEventListener("change", this._handleAppStateChange);
      
        whoosh.play((success) => {});
        whoosh.setVolume(1);
        whoosh.setNumberOfLoops(5000000)

      }

      componentWillUnmount() {
      
        AppState.removeEventListener("change", this._handleAppStateChange);
        whoosh.release();

        const random = Math.floor(Math.random() * 4) + 1;

        let music = "";
        switch(random){
          case 1 : music = "music4.mp3";  break;
          case 2 : music = "music3.mp3";  break;
          case 3 : music = "bg2.mp3";  break;
          default :  music = "bg1.mp3";  break;
        }

        console.log(music);
                  
        whoosh = new Sound(music, Sound.MAIN_BUNDLE, (error) => {});
      }

      _handleAppStateChange = nextAppState => {
        if ( this.state.appState.match(/inactive|background/) &&nextAppState === "active") {
          console.log("App has come to the foreground!");
        }
        
        if(nextAppState == "active") { whoosh.play()}
        else if(nextAppState == "background") { whoosh.pause()}

        this.setState({ appState: nextAppState });
     
      };

    render(){
        return(
        <SafeAreaView style={{}}></SafeAreaView>
        );
    }
}