//This is the feed screen
import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import StoryCard from "./storycard";

let fonts = {
    'makan-hati': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}

let stories = require("./stories.json")

export default class Home extends Component {

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
    
    renderItem = ({ item: story }) => {
        return <StoryCard story={story} />;
    };

    keyExtractor = (item, index) => index.toString()

    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>Title</Text>
                        </View>
                    </View>
                    <View style={styles.cardContainer}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={stories}
                            renderItem={this.renderItem}
                            horizontal={true}
                        />
                    </View>
                    <View style={{ flex: 0.08 }} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#91150c"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(5)
    },
    appTitle: {
        flex: 1,
        flexDirection: 'row'
    },
    appIcon: {

    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center",
        alignContent: 'center'
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(38),
        fontFamily: 'makan-hati',
    },
    cardContainer: {
        flex: 0.85
    }
});
