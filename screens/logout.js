import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

let fonts = {
  'custom-font': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}

export default class Logout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: false
    }
  }

  componentDidMount() {
    this._loadFontsAsync()
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }


  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Logout</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  text: {
    fontFamily:'custom-font',
    fontSize:50,
    color:'white'
  }
});
