import React from "react";

import { View, StatusBar, StyleSheet } from "react-native";

const TopBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.topBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const styles = StyleSheet.create({
  topBar: {
    height: StatusBar.currentHeight
  }
});
export default TopBar;
