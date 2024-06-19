import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import { useForm, Controller } from "react-hook-form";
import Error from "../components/reusable/Error";
import Logo from "../components/Auth/Logo";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AuthProvidersC from "../components/Auth/AuthProvidersC";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [passwordConfirmationSecure, setPasswordConfirmationSecure] =
    useState(true);
  const insets = useSafeAreaInsets();
  const [apiError, setApiError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const handleInscription = async (data) => {
    setIsLoading(true);
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    const bodyConnexion = {
      email: data.email,
      password: data.password,
    };

    const bodyEmail = {
      email: data.email,
      type: "emailConfirmation",
    }

    try {
      const response = await axios.post(
        "http:/192.168.178.159:3000/users",
        body
      );

      if (response.status == 200) {
        const responseConnexion = await axios.post(
          "http:/192.168.178.159:3000/users/login",
          bodyConnexion
        );

        await axios.post(
          "http:/192.168.178.159:3000/users/sendMail",
          bodyEmail
        );

        if (responseConnexion.status == 200) {
          const data = await responseConnexion.data;
          await AsyncStorage.setItem("accessToken", data.accessToken);
          await AsyncStorage.setItem("refreshToken", data.refreshToken);
          navigation.navigate("Home");
        }
      }
    } catch (error) {
      if (error.response.status == 409) {
        Alert.alert("L'email existe déjà");
      } else {
        Alert.alert("Une erreur est survenu lors de la création du compte");
      }
    }

    reset();
    setPasswordSecure(true);
    setPasswordConfirmationSecure(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    return reset();
  }, [isSubmitSuccessful]);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={globalStyles.screenStyle}>
        {/* Partie haut */}
        <View>
          <Logo />
          {/* Logo de la page */}

          {/* Regroupe le reste de la page */}
          <KeyboardAvoidingView style={[{ flexGrow: 1 }]}>
            {/* Text de page */}
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: RFPercentage(3.5),
                  fontFamily: "Inter-Bold",
                }}>
                Inscrivez-Vous
              </Text>
            </View>

            {/* Input Nom complet */}
            <View
              style={[
                styles.inputForm,
                windowWidth > 500
                  ? { borderRadius: 20, gap: 30 }
                  : { borderRadius: 10, gap: 15 },
                {
                  marginTop: hp("4%"),
                },
              ]}>
              <Ionicons
                name='person'
                size={windowWidth > 500 ? 40 : 20}
                color='gray'
              />

              <Controller
                name='name'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={globalStyles.inputContent}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline={false}
                    numberOfLines={1}
                    placeholder='Entrez votre nom complet'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Le nom complet est réquis",
                  },
                  minLength: {
                    value: 5,
                    message: "Votre nom doit avoir au moins 5 caractère",
                  },
                }}
              />

              <View style={{ height: hp("6.5%") }}>
                <Text></Text>
              </View>
            </View>
            {errors.name && <Error>{errors.name.message}</Error>}

            {/* Input Email */}
            <View
              style={[
                styles.inputForm,
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
                    multiline={false}
                    numberOfLines={1}
                    onChangeText={onChange}
                    placeholder='Entrez votre adresse mail'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "L'adresse email est réquis",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/i,
                    message: "L'addresse email n'est pas valide",
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
                styles.inputForm,
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
                    secureTextEntry={passwordSecure}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline={false}
                    numberOfLines={1}
                    placeholder='Entrez votre mot de passe'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "Le mot de passe est réquis",
                  },
                  minLength: {
                    value: 5,
                    message:
                      "Le mot de passe doit au moins contenir 5 caractère",
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

            {/* Input confirm mot de pass */}
            <View
              style={[
                styles.inputForm,
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
                name='passwordConfirm'
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[globalStyles.inputContent, { overflow: "hidden" }]}
                    secureTextEntry={passwordConfirmationSecure}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    multiline={false}
                    numberOfLines={1}
                    placeholder='Confirmez votre mot de passe'></TextInput>
                )}
                rules={{
                  required: {
                    value: true,
                    message: "La confirmation du mot de passe est réquis",
                  },
                  minLength: {
                    value: 5,
                    message:
                      "La confirmation du mot de passe doit au moins contenir 5 caractère",
                  },
                }}
              />

              <Pressable
                onPress={() =>
                  setPasswordConfirmationSecure(!passwordConfirmationSecure)
                }
                style={[
                  { height: hp("6.5%"), justifyContent: "center" },
                  windowWidth > 500
                    ? { paddingHorizontal: 20 }
                    : { paddingHorizontal: 10 },
                ]}>
                {passwordConfirmationSecure ? (
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

            {/* Boutton s'inscrire */}
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
                onPress={handleSubmit(handleInscription)}
                disabled={isLoading}>
                <Text
                  style={{
                    fontSize: RFPercentage(2.1),
                    fontFamily: "Inter-SemiBold",
                  }}>
                  S'inscrire
                </Text>
              </Pressable>
            </View>

            {/* Les deux providers (facebook et google) */}
            <AuthProvidersC type='inscription' />
          </KeyboardAvoidingView>
        </View>

        {/* Partie bas */}
        <View>
          {/* Lien vers la connexion */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}>
            <Pressable
              style={{ paddingVertical: hp("4") }}
              onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: RFPercentage(2),
                  fontFamily: "Inter-Medium",
                }}>
                Déjà un compte ? Cliquez ici
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: wp("3%"),
    marginTop: hp("3%"),
  },
});
