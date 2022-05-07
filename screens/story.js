//User can see the full story in it
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Story extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Story Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
