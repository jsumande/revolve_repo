/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component,Fragment  } from 'react';
import {SafeAreaView ,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './Component/LandingScreen';
import MainScreen from './Component/MainScreen';
import GroundTest from './Component/GroundTest';
import Success from './Component/Success';
import GroundTests from './Component/GroundTests';
import Onex2 from './Component/Onex2';
import Onex3 from './Component/Onex3';
import Twox2 from './Component/Twox2';
import Twox3 from './Component/Twox3';
import Threex3 from './Component/Threex3';
import Threex4 from './Component/Threex4';
import Threex5 from './Component/Threex5';
import Game_loader from './Component/Game_loader';
import Level_Stage from './Component/Level_Stage';
import Interstitial from './Component/Interstitial';
import Lock_Component from './Component/Lock_Component';
import { I18nManager} from 'react-native';
I18nManager.allowRTL(false);
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function MyNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing" mode="modal">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Level_Stage" component={Level_Stage} />
      <Stack.Screen name="GroundTest" component={GroundTest} />
      <Stack.Screen name="GroundTests" component={GroundTests} />
      <Stack.Screen name="Onex2" component={Onex2} />
      <Stack.Screen name="Onex3" component={Onex3} />
      <Stack.Screen name="Twox2" component={Twox2} />
      <Stack.Screen name="Twox3" component={Twox3} />
      <Stack.Screen name="Threex3" component={Threex3} />
      <Stack.Screen name="Threex4" component={Threex4} />
      <Stack.Screen name="Threex5" component={Threex5} />
      <Stack.Screen name="Game_loader" component={Game_loader} />
      <Stack.Screen name="Interstitial" component={Interstitial} />
    </Stack.Navigator>
  );
}


export default class App extends Component  {

  render(){
    return(
      <Fragment>

        <SafeAreaView style={{ flex: 0, backgroundColor: '#480582'}} />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#480582' }}>

        <StatusBar barStyle="light-content" backgroundColor = "#480582" />
          <NavigationContainer>
              <MyNavigation/>
          </NavigationContainer>
        </SafeAreaView>

          
      </Fragment>
    );
  }
}
