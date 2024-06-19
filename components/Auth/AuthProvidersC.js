import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React from "react";
import globalStyles from "../../globalStyles";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

const AuthProvidersC = ({ type }) => {
  const windowWidth = Dimensions.get("window").width;

  if (type == "connexion") {
    return (
      <View
        style={[
          { marginTop: hp("4%") },
          windowWidth > 500 ? { gap: 40 } : { gap: 20 },
        ]}>
        {/* Connexion avec facebook */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Pressable
            style={[
              globalStyles.outConnexionPressable,
              windowWidth > 500
                ? { borderRadius: 30, gap: 20 }
                : { borderRadius: 15, gap: 10 },
            ]}>
            <Entypo
              name='facebook'
              size={windowWidth > 500 ? 50 : 25}
              color='black'
            />

            <Text
              style={{
                fontSize: RFPercentage(1.7),
                fontFamily: "Inter-Bold",
                color: "white",
              }}>
              Connectez-vous avec Facebook
            </Text>
          </Pressable>
        </View>

        {/* Connexion avec google */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Pressable
            style={[
              globalStyles.outConnexionPressable,
              windowWidth > 500
                ? { borderRadius: 30, gap: 20 }
                : { borderRadius: 15, gap: 10 },
            ]}>
            <AntDesign
              name='google'
              size={windowWidth > 500 ? 50 : 25}
              color='black'
            />

            <Text
              style={{
                fontSize: RFPercentage(1.7),
                fontFamily: "Inter-Bold",
                color: "white",
              }}>
              Connectez-vous avec Google
            </Text>
          </Pressable>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          { marginTop: hp("4%") },
          windowWidth > 500 ? { gap: 40 } : { gap: 20 },
        ]}>
        {/* Connexion avec facebook */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Pressable
            style={[
              globalStyles.outConnexionPressable,
              windowWidth > 500
                ? { borderRadius: 30, gap: 20 }
                : { borderRadius: 15, gap: 10 },
            ]}>
            <Entypo
              name='facebook'
              size={windowWidth > 500 ? 50 : 25}
              color='black'
            />

            <Text
              style={{
                fontSize: RFPercentage(1.7),
                fontFamily: "Inter-Bold",
                color: "white",
              }}>
              Inscrivez-vous avec Facebook
            </Text>
          </Pressable>
        </View>

        {/* Connexion avec google */}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Pressable
            style={[
              globalStyles.outConnexionPressable,
              windowWidth > 500
                ? { borderRadius: 30, gap: 20 }
                : { borderRadius: 15, gap: 10 },
            ]}>
            <AntDesign
              name='google'
              size={windowWidth > 500 ? 50 : 25}
              color='black'
            />

            <Text
              style={{
                fontSize: RFPercentage(1.7),
                fontFamily: "Inter-Bold",
                color: "white",
              }}>
              Inscrivez-vous avec Google
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        { marginTop: hp("4%") },
        windowWidth > 500 ? { gap: 40 } : { gap: 20 },
      ]}>
      {/* Connexion avec facebook */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          style={[
            globalStyles.outConnexionPressable,
            windowWidth > 500
              ? { borderRadius: 30, gap: 20 }
              : { borderRadius: 15, gap: 10 },
          ]}>
          <Entypo
            name='facebook'
            size={windowWidth > 500 ? 50 : 25}
            color='black'
          />

          <Text
            style={{
              fontSize: RFPercentage(1.7),
              fontFamily: "Inter-Bold",
              color: "white",
            }}>
            Connectez-vous avec Facebook
          </Text>
        </Pressable>
      </View>

      {/* Connexion avec google */}
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          style={[
            globalStyles.outConnexionPressable,
            windowWidth > 500
              ? { borderRadius: 30, gap: 20 }
              : { borderRadius: 15, gap: 10 },
          ]}>
          <AntDesign
            name='google'
            size={windowWidth > 500 ? 50 : 25}
            color='black'
          />

          <Text
            style={{
              fontSize: RFPercentage(1.7),
              fontFamily: "Inter-Bold",
              color: "white",
            }}>
            Connectez-vous avec Google
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthProvidersC;

const styles = StyleSheet.create({});
