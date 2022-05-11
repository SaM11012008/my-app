//it is a preview of the story it will be visible on home screen
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let fonts = {
    'custom-font': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}

export default class StoryCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: true
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
            return <AppLoading />
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.cardContainer}>
                        <Image
                            source={require("../assets/bajrangbali.png")}
                            style={styles.storyImage}
                        ></Image>

                        <View style={styles.titleContainer}>
                            <Text style={styles.storyTitleText}>
                                {this.props.story.title}
                            </Text>
                            <Text style={styles.storyAuthorText}>
                                {this.props.story.author}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {this.props.story.description}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardContainer: {
        margin: RFValue(53),
        backgroundColor: "#eb4034",
        borderRadius: RFValue(15),
    },
    storyImage: {
        resizeMode: "contain",
        width: "95%",
        alignSelf: "center",
        height: RFValue(250)
    },
    titleContainer: {
        padding:100,
    },
    storyTitleText: {
        fontSize: RFValue(25),
        fontFamily: "custom-font",
        color: "white"
    },
    storyAuthorText: {
        fontSize: RFValue(18),
        fontFamily: "custom-font",
        color: "white"
    },
    descriptionText: {
        fontFamily: "custom-font",
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        padding: RFValue(10)
    },
})