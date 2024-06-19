import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Error = ({ children }) => {
  return (
    <View style={{ marginTop: hp("0.5%") }}>
      <Text style={{ color: "red", fontFamily: 'Inter-Medium', fontSize: RFPercentage(2) }}>{children}</Text>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({})