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
import firebase from 'firebase';
import Logout from './logout';

let fonts = {
    'custom-font': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}

let stories = require("./stories.json")

export default class StoryCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: true,
            story_data: this.props.stories
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
        let story = this.state.story_data
        if (!this.state.fontsLoaded) {
            return <AppLoading />
        } else {
            let images = {
                hanumanImg: require("../assets/bajrangbali.png")
            }
            return (
                <TouchableOpacity style={styles.container}
                    onPress={() =>
                        this.props.navigation.navigate("Story", {
                            story: story
                        })
                    }
                >
                    <View style={styles.cardContainer}>
                        <Image
                            source={require("../assets/bajrangbali.png")}
                            style={styles.storyImage}
                        />
                        <View style={styles.titleContainer}>
                            <Text style={styles.storyTitleText}>
                                {this.props.story.title}
                            </Text>
                            <Text style={styles.descriptionText}>
                                {this.props.story.description}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    cardContainer: {
        margin: RFValue(50),
        width: "75%",
        backgroundColor: "#C99356",
        borderRadius: RFValue(15),
    },
    storyImage: {
        width: "75%",
        height: RFValue(250),
        alignSelf: 'center'
    },
    titleContainer: {
        height: 300,
        width: 350
    },
    storyTitleText: {
        fontSize: RFValue(23),
        fontFamily: "custom-font",
        color: "#6D4840",
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    descriptionText: {
        fontFamily: "custom-font",
        fontSize: RFValue(19),
        color: "#6D4840",
        paddingTop: RFValue(10),
        flexWrap: 'wrap',
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15
    },
})