//User can see the full story in it
/*This event occurs in the context of Lord Vishnu’s kUrmAvatAra (the descent in the form of a giant turtle). 
        In the old golden mythical age of kRta yuga when the devas (the “good guys”) and the asuras (the “bad guys”) were young and always fighting for supremacy over the administration of the universe, 
        they both found out that they were equally matched in strength and talent. So for a long time, no party was permanently victorious. So after one of these battles, 
        the devas were ousted from their capital city in heaven amaravatI and it was occupied by the asuras.    
        So, the devas went to Lord Brahma for advice. 
        Brahma (despite being the creator of the entire universe) advised them to go visit Lord Vishnu, so they all went to visit Lord Vishnu at his residence on the milk ocean (ksheer sagar). 
        Vishnu comes up with the idea that the milk ocean should be churned, which would then yield the nectar of immortality (amRtam) which would make the devas invincible. 
        Then they would be able to definitively defeat the asuras.
        The devas were excited to hear about this idea. However, Vishnu said there was a caveat — they couldn’t churn the ocean by themselves. 
        They had to work out a truce with the asuras to collaborate on this massive undertaking. 
        So Indra sent a messenger to Virocana, the leader of the asuras detailing the plan and asking for collaboration. 
        Some of the senior asura leaders were completely opposed to the plan as they could smell something fishy in this sudden proposal for peace. 
        However, the majority of them thought this might be a good idea, as they might be able to negotiate some deal for their contribution.
        So it was all set. The devas and asuras would churn the milk ocean as a team. However, they needed a “churning rod” and a rope to churn with.
        Vishnu again came up with the idea to use mandara mountain as the churning rod, and the serpent king vAsuki as the rope. So they uprooted the mountain and set it in the ocean. 
        But it took a lot more to convince the serpent to participate. He was rightly concerned that this task would kill him because of the rubbing against the mountain. 
        Vishnu reassured him that his body would not be harmed and he would also get a portion of the nectar for his effort. With vAsuki also committed to the task, everything was set in motion.
        Vishnu, thinking ahead, also managed to get the devas positioned on the tail end of the serpent so that they would be spared the venom spewing from the mouths of the serpent.
        
        Soon after they started churning they found out that the weight of the mountain was causing it to sink into the ocean bed!
        This is when Vishnu creates a form of a giant turtle ("kUrmAvatAr") out of himself and positions himself under the mountain to support it.
        Now, the teams were really set to churn the ocean in all seriousness. 
        As it happens with any new endeavor, problems and obstacles come first. So the first product of the churning was the toxic mixture halAhala.It spread in the ocean and its fumes filled the air, choking and blinding the teams, and killing thousands of creatures. Lord Shiva stepped in and rescued everyone by drinking up the poison. This is when he got his name viShakaNTha, nIlakaNTha, shithikaNTha, etc.With the poison cleared, the teams of devas and asuras continued to churn for a long time. Finally, good things started to come out of the ocean.Celestial weapons, divine animals, goddess of liquor (whom the asuras asked to be with), divine trees, divine flower, gems, goddess Lakshmi (who chose to be with Vishnu).At the end, the divine doctor dhanvantari came out holding the golden pot filled with the nectar.As soon as the asuras saw dhanvantari, they forgot everything about their pact with the devas and snatched the pot from him.As the devas looked to Vishnu for what to do next, Vishnu gave them a reassuring nod and gestured to them to remain calm.Next, Vishnu creates another form, that of the bewitchingly beautiful woman mohini. She begins to dance in a most sensuous manner, and as the asuras hear and see her, they fall into a mesmerizing trance, and hand over the pot of nectar to her. She tells them that she will distribute the nectar to everyone, and asks the devas and asuras to sit in two rows.As was planned, she starts pouring out the nectar to the devas, and the asuras are waiting patiently. She is trying to make sure that the pot becomes empty by the end of the row of devas, so that the asuras don’t get any nectar. Only the asura rAhu suspects this and quietly slips away from the asura line and hides behind the devas. As mohini continues to pass by each deva, rahu also receives some nectar into his bowl.However, as he is drinking it, sUrya (sun) and candra (moon) discover him and point him out to mohini.Quick as lightning, she releases the sudarshana cakra to cut off his head before the nectar can go down his throat. But he is still able to retain the nectar that he drank in his head and this is how rAhu’s head became immortal. From then on, rAhu swore eternal vengeance on sUrya and candra, and even to this day we see him swallow up the sun and the moon during their eclipses. In the end, all the devas drink up the nectar, leaving nothing for the asuras. With their new strength, they defeat the asuras and regain their heavenly kingdom.*/

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
