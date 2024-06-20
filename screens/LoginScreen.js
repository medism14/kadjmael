import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  ScrollView,
  Pressable,
  Divider,
  Alert,
} from "react-native";
import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import Logo from "../components/Auth/Logo";
import globalStyles from "../globalStyles";
import { useForm, Controller } from "react-hook-form";
import Error from "../components/reusable/Error";
import AuthProvidersC from "../components/Auth/AuthProvidersC";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = () => {

  const windowWidth = Dimensions.get("window").width;

  const [isSelected, setisSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordSecure, setPasswordSecure] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setValue,
    reset,
    clearErrors,
  } = useForm();

  const handleConnexion = async (data) => {
    setIsLoading(true);
    try {
      const body = {
        email: data.email,
        password: data.password,
        souvenir: isSelected,
        type: 'normal',
      };

      const response = await axios.post(
        "http:/192.168.178.159:3000/users/login",
        body
      );

      if (response.status == 200) {
        const data = await response.data;

        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("refreshToken", data.refreshToken);
        navigation.navigate("Home");
      } else {
        Alert.alert("Problème lors de l'authentification");
      }
    } catch (error) {
      if (error.response.status === 404) {
        Alert.alert("Cet utilisateur n'existe pas");
      } else if (error.response.status === 401) {
        Alert.alert("Votre mot de passe est incorrect");
      } else {
        Alert.alert("Une erreur s'est produit lors de la connexion");
      }
    }

    setPasswordSecure(true);
    reset();
    clearErrors();
    setIsLoading(false)
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }

    return reset();
  }, [isSubmitSuccessful]);

  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[globalStyles.screenStyle]}>
        {/* Côté haut */}
        <View>
          {/* Image de la page */}
          <Logo />

          {/* Regroupe le reste de la page */}
          <KeyboardAvoidingView style={{ flexGrow: 1 }}>
            {/* Text de page */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: RFPercentage(3.5),
                  fontFamily: "Inter-Bold",
                }}>
                Connectez-Vous
              </Text>
            </View>

            {/* Input Email */}
            <View
              style={[
                globalStyles.inputForm,
                windowWidth > 500
                  ? { borderRadius: 20, gap: 30 }
                  : { borderRadius: 10, gap: 15 },
              ]}>
              <FontAwesome5
                name='mail-bulk'
                size={windowWidth > 500 ? 40 : 20}
                color='gray'
              />

              <Controller
                name='email'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={globalStyles.inputContent}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline={false}
                    numberOfLines={1}
                    placeholder='Entrez votre adresse mail'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "L'email est réquis",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+/i,
                    message: "Votre format ne respecte pas un email",
                  },
                }}
              />

              <View style={{ height: hp("6.5%") }}>
                <Text></Text>
              </View>
            </View>
            {errors.email && <Error>{errors.email.message}</Error>}

            {/* Input Mot de passe */}
            <View
              style={[
                globalStyles.inputForm,
                windowWidth > 500
                  ? { borderRadius: 20, gap: 30 }
                  : { borderRadius: 10, gap: 15 },
              ]}>
              <Entypo
                name='lock'
                size={windowWidth > 500 ? 40 : 20}
                color='gray'
              />

              <Controller
                name='password'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={globalStyles.inputContent}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline={false}
                    numberOfLines={1}
                    secureTextEntry={passwordSecure}
                    placeholder='Entrez votre mot de passe'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Le mot de passe est réquis",
                  },
                  minLength: {
                    value: 5,
                    message: "Le mot de passe doit au moins avoir 5 caractère",
                  },
                }}
              />

              <Pressable
                onPress={() => setPasswordSecure(!passwordSecure)}
                style={[
                  { height: hp("6.5%"), justifyContent: "center" },
                  windowWidth > 500
                    ? { paddingHorizontal: 20 }
                    : { paddingHorizontal: 10 },
                ]}>
                {passwordSecure ? (
                  <AntDesign
                    name='eye'
                    size={windowWidth > 500 ? 40 : 20}
                    color='black'
                  />
                ) : (
                  <Entypo
                    name='eye-with-line'
                    size={windowWidth > 500 ? 40 : 20}
                    color='black'
                  />
                )}
              </Pressable>
            </View>
            {errors.password && <Error>{errors.password.message}</Error>}

            {/* En bas du formulaire */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: hp("3%"),
              }}>
              <View
                style={[
                  { flexDirection: "row" },
                  windowWidth > 500 ? { gap: 10 } : { gap: 5 },
                ]}>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    fontFamily: "Inter-Medium",
                  }}>
                  Rester Connecté
                </Text>

                <Checkbox value={isSelected} onValueChange={setisSelected} />
              </View>

              <Pressable onPress={() => navigation.navigate("PasswordForget")}>
                <Text
                  style={{
                    fontSize: RFPercentage(2),
                    fontFamily: "Inter-Medium",
                  }}>
                  Mot de passe oublié
                </Text>
              </Pressable>
            </View>

            {/* Boutton se connecter */}
            <View
              style={{
                alignItems: "center",
                marginTop: hp("3.5%"),
              }}>
              <Pressable
                style={[
                  {
                    backgroundColor: "#FFC72C",
                    paddingVertical: hp("1.5%"),
                    paddingHorizontal: wp("10%"),
                  },
                  windowWidth > 500
                    ? { borderRadius: 20 }
                    : { borderRadius: 10 },
                ]}
                onPress={handleSubmit(handleConnexion)}
                disabled={isLoading}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.1),
                    fontFamily: "Inter-SemiBold",
                  }}>
                  Se connecter
                </Text>
              </Pressable>
            </View>

            {/* Les deux providers (facebook et google) */}
            <AuthProvidersC type='connexion' />
          </KeyboardAvoidingView>
        </View>

        {/* Côté bas */}
        <View>
          {/* Lien vers inscription */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <Pressable
              style={{ paddingVertical: hp("4%") }}
              onPress={() => navigation.navigate("Register")}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  fontFamily: "Inter-Medium",
                }}>
                Vous n'avez pas de compte ? Cliquez ici
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
