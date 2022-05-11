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
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

let fonts = {
  'custom-font': require('../assets/fonts/WaukeganLdoBold-ZVeK.ttf')
}

export default class Login extends Component {

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

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
          firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  onSignIn = (googleUser) => {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: 'dark',
                })
                .then(function (snapshot) { });
            }
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behaviour: 'web',
        androidClientId:
          '702103752084-g4g3tik3k203uoaed09ip3in9q91601u.apps.googleusercontent.com',
        iosClientId:
          '702103752084-nmdke9pl1di6rtuqj5km1bp8qrhbp8in.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      console.log(e.message);
      return { error: true };
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        < View style={styles.container} >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <Text style={styles.appTitleText}>{`My App`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signInWithGoogleAsync()}>
              <Image
                source={require('../assets/google_icon.png')}
                style={styles.googleIcon}></Image>
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>
        </View >
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#32a86d',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitleText: {
    color: '#332e2e',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'custom-font',
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
  },
  googleIcon: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'custom-font',
  },
});
