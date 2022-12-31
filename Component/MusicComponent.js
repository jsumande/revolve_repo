import React, { Component } from 'react';

import { SafeAreaView,AppState } from 'react-native';
import SoundPlayer from 'react-native-sound-player'
var Sound = require('react-native-sound');

var whoosh = new Sound("music.mp3", Sound.MAIN_BUNDLE, (error) => {});

export default class MusicComponent extends Component {


    constructor(props, context) {
      super(props, context);
      
        this.state = {
            appState: AppState.currentState,
           
        }
      }
      
      async componentDidMount() {
    
        AppState.addEventListener("change", this._handleAppStateChange);
       
        

        whoosh.stop(() => {
          whoosh.play((success) => {});
          whoosh.setVolume(1);
          whoosh.setNumberOfLoops(5000000)
        });

      }

      componentWillUnmount() {
        console.log("UnMount");
        AppState.removeEventListener("change", this._handleAppStateChange);
        whoosh.stop(() => {});
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