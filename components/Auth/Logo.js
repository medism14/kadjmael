import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Logo = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        style={{
          width: wp("30%"),
          height: wp("30%"),
          marginBottom: hp("2%"),
        }}
        resizeMode='contain'
        source={require("../../assets/images/logo.png")}
      />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});
