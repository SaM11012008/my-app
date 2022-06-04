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
    TouchableOpacity,
    Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import Logout from './logout';
import firebase from 'firebase';

const { width: WIDTH } = Dimensions.get('window')

let fonts = {
    'custom-font': require('../assets/fonts/MakanHati-vmp94.ttf')
}


export default class Settings extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fontsLoaded: false,
            profile_image: "",
            name: ""
        }
    }

    componentDidMount() {
        this._loadFontsAsync()
        this.fetchUser()
    }

    async _loadFontsAsync() {
        await Font.loadAsync(fonts);
        this.setState({ fontsLoaded: true });
    }

    async fetchUser() {
        let name, image;
        await firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
                image = snapshot.val().profile_picture;
            });
        this.setState({
            name: name,
            profile_image: image
        });
    }


    render() {
        if (!this.state.fontsLoaded) {
            return <AppLoading />;
        } else {
            return (
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}> My App </Text>
                        </View>
                    </View>
                    <View style={styles.screenContainer}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={{ uri: this.state.profile_image }}
                                style={styles.profileImage}
                            />
                            <Text style={styles.nameText}>
                                {this.state.name}
                            </Text>
                        </View>
                        <View style={{ flex: 0.3 }} />
                    </View>
                    <View style={{ flex: 0.08 }} />
                    <View style={styles.screenContainer}>
                        {/*}   <TouchableOpacity style={styles.logoutbtn} >
                            <Text style={styles.btnText}> Logout </Text>
            </TouchableOpacity>*/}
                        <Logout />
                    </View>
                </View>
            );
        }
    }
}

//onPress={(firebase.auth().signOut())}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#392C2C"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: "row"
    },
    appTitleTextContainer: {
        justifyContent: "center"
    },
    appTitleText: {
        color: "#E8C360",
        fontSize: RFValue(28),
        fontFamily: "custom-font"
    },
    screenContainer: {
        flex: 1.5
    },
    profileImageContainer: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70)
    },

    nameText: {
        color: "#E8C360",
        fontSize: RFValue(40),
        fontFamily: "custom-font",
        marginTop: RFValue(10)
    },
    logoutbtn: {
        backgroundColor: '#E8C360',
        justifyContent: 'center',
        alignItems: 'center',
        width: WIDTH - 55,
        height: 45,
        borderRadius: 25,
        marginTop: 20,
        marginLeft: 25,
    },
    btnText: {
        color: '#392C2C',
        fontSize: 23,
        fontFamily: 'custom-font',
        textAlign: 'center'
    },
});
