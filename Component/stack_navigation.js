import * as React from 'react';
import { View, Text ,SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './LandingScreen';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
      <Drawer.Navigator drawerType="slide" drawerPosition="left" initialRouteName="Abu Dhabi Movies">
        <Drawer.Screen name="Abu Dhabi Movies" component={LandingScreen}/>
        </Drawer.Navigator>
    );
  }

function MyNavigation() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
          <Stack.Screen name="Home" component={MyDrawer} />
        <Stack.Screen name="Landing" component={LandingScreen} />
      </Stack.Navigator>
    );
  }

export default function App() {
    return (
      <NavigationContainer>
        <MyNavigation/>
      </NavigationContainer>
    );
  }
  