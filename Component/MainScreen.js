import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';
import { StyleSheet,TouchableOpacity,View,Text,Modal,SafeAreaView,Image,ImageBackground,Animated, TouchableWithoutFeedback,Button  } from 'react-native';

export default class Main extends Component {

    // SoundPlayer = new SoundPlayer('motorcycle.mp3');
    constructor(){
        super();
    
        this.state = {
      }

    }

    componentDidMount(){
      this.props.navigation.navigate('Twox2')
    }


    render(){
        return(
        <SafeAreaView style={{flex:1}}>
        <ImageBackground source={require('./img/bg1.png')} style={styles.container}>

        <View style={{flex:5,justifyContent : "center",alignItems : "center",}}>

          {/* <TouchableOpacity style={{position:'relative',top:'10%',}} onPress={() => this.props.navigation.navigate('Twox2')}>
          <Image source={require('./img/play.png')} style={styles.img} />
          </TouchableOpacity> */}
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
      // justifyContent : "center",
      // alignItems : "center",
    },
  
    img :{
        width : 85,
        height : 85,
        resizeMode: 'stretch',
    },
  
    pause :{
      width : 75,
      height : 75,
    },
  
    setting :{
      width : 75,
      height : 75,
    },
  
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },

    TouchableOpacityStyle: {
        position: 'absolute',
        right: 10,
        bottom: 30,
     },
    //  borderBottomLeftRadius: 15,borderBottomRightRadius:15

     TouchableOpacityStyle2: {
        position: 'absolute',
        left: 10,
        bottom: 30,
     },

     HeaderOpacity : {
        position: 'absolute',
        top: 0,
     },

     touchSpin_1 : {
      width: 150,height: 150,
      borderRadius: 150,
      backgroundColor: '#EDEDED',
      justifyContent:'center',
      alignItems:'center',
      position: 'relative',
      left:30,top:60,
     },

     sample : {
      borderTopWidth:0,
      borderBottomLeftRadius: 15,
      borderBottomRightRadius:15,
     },

     sample2 : {
      borderRadius: 15,
     }
  
  });