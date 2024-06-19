import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("accessToken");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Vous n'êtes pas authentifié");
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Pressable
        style={{
          marginTop: 10,
          padding: 10,
          borderWidth: 2,
          borderColor: "#000000",
        }}
        onPress={handleLogout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
