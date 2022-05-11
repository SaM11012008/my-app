//This will contain toggle button for changing the theme and logout button inside it
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Switch
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Logout from './logout'

let fonts = {
    'custom-font': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}


export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false
        }
    }

    toggleSwitch(){

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
                    <Logout/>
                    <Text style={styles.text}>Settings</Text> 
                </View>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black'
    },
    text: {
        fontSize: 50,
        fontFamily: 'custom-font',
        color: 'white'
    }
});
