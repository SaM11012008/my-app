import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("DashboardScreen");
            } else {
                this.props.navigation.navigate("Login");
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#E8C360' }}>Loading....</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#392C2C",
    }
});
