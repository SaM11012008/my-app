import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from "react-native";
import BottomTabNavigator from './navigation/tabnavigator';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

/*if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}*/

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}
