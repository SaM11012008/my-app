//User can see the full story in it
/**/

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Speech from "expo-speech";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let fonts = {
  'custom-font': require('../assets/fonts/MakanHati-vmp94.ttf')
}

export default class Story extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fontsLoaded: true,
      speakerColor: "gray",
      speakerIcon: "volume-high-outline",
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ fontsLoaded: true });
  }

  async initiateTTS(title, author, story, moral) {
    console.log(title);
    const current_color = this.state.speakerColor;
    this.setState({
      speakerColor: current_color === "gray" ? "#ee8249" : "gray"
    });
    if (current_color === "gray") {
      Speech.speak(`${title} by ${author}`);
      Speech.speak(story);
      Speech.speak("The moral of the story is!");
      Speech.speak(moral);
    } else {
      Speech.stop();
    }
  }

  render() {
    if (!this.props.route.params) {
      this.props.navigation.navigate("Home");
    } else if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>
                My App
              </Text>
            </View>
          </View>
          <View style={styles.storyContainer}>
            <View style={styles.dataContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={styles.storyTitleText}>
                  {this.props.route.params.story.title}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                <TouchableOpacity
                  onPress={() =>
                    this.initiateTTS(
                      this.props.route.params.title,
                      this.props.route.params.story,
                      this.props.route.params.moral
                    )
                  }
                >
                  <Ionicons
                    name={this.state.speakerIcon}
                    size={RFValue(30)}
                    color={this.state.speakerColor}
                    style={{ margin: RFValue(15) }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.storyTextContainer}>
              <Text
                style={styles.storyText}>
                {this.props.route.params.story.story}
              </Text>
              <Text
                style={styles.moralText}>
                Moral - {this.props.route.params.story.moral}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#392C2C"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "#E8C360",
    fontSize: RFValue(28),
    fontFamily: "custom-font"
  },
  storyContainer: {
    flex: 1
  },
  storyCard: {
    margin: RFValue(20),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  image: {
    width: "100%",
    alignSelf: "center",
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: "contain"
  },
  dataContainer: {
    flexDirection: "row",
    padding: RFValue(20)
  },
  titleTextContainer: {
    flex: 0.8
  },
  storyTitleText: {
    fontFamily: "custom-font",
    fontSize: RFValue(25),
    color: "#E8C360"
  },
  storyAuthorText: {
    fontFamily: "custom-font",
    fontSize: RFValue(18),
    color: "#E8C360"
  },
  iconContainer: {
    flex: 0.2
  },
  storyTextContainer: {
    padding: RFValue(20)
  },
  storyText: {
    fontFamily: "custom-font",
    fontSize: RFValue(15),
    color: "#E8C360"
  },
  moralText: {
    fontFamily: "custom-font",
    fontSize: RFValue(20),
    color: "#E8C360"
  },
});
