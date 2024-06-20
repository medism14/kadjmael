import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import globalStyles from "../../globalStyles";
import { Entypo } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

const AuthProvidersC = ({ type }) => {
  const windowWidth = Dimensions.get("window").width;

  const [useInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId:
        "550838337034-a6j15j590kfuqhl9ogpmbc66dk6r1ia1.apps.googleusercontent.com",
    },
    { native: "myapp://auth" }
  );

  const handleClick = () => {
    console.log("clicked");
  };

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
          ]}
          onPress={handleClick}>
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
            {type === "connexion"
              ? "Connectez-vous avec Facebook"
              : "Inscrivez-vous avec Facebook"}
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
          ]}
          onPress={() => {
            promptAsync();
          }}>
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
            {type === "connexion"
              ? "Connectez-vous avec Google"
              : "Inscrivez-vous avec Google"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AuthProvidersC;

const styles = StyleSheet.create({});
