import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import BottomTabNavigator from './navigation/tabnavigator';

export default function App() {
  return (
    <NavigationContainer>
       <BottomTabNavigator/>
      </NavigationContainer>
  )
}
