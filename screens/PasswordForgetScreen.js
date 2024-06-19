import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import globalStyles from "../globalStyles";
import Logo from "../components/Auth/Logo";
import { useForm, Controller, useWatch } from "react-hook-form";
import Error from "../components/reusable/Error";
import axios from "axios";

const PasswordForgetScreen = () => {
  const windowWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const handleSendConfirmation = async (data) => {

    const body = {
      email: data.email,
      type: "passwordForget"
    }

    const response = await axios.post("http:/192.168.178.159:3000/users/sendMail", body)
    console.log(data);
    reset();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful])

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[globalStyles.screenStyle]}>
        {/* Côté haut */}
        <View>
          {/* Logo de la page */}
          <Logo />

          {/* Titre de la page */}
          <View
            style={{
              alignItems: "center",
            }}>
            <Text
              style={{
                fontFamily: "Inter-ExtraBold",
                fontSize: RFPercentage(3),
              }}>
              Mot de passe oublié
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

          {/* Boutton envoyer le mail */}
          <View
            style={{
              alignItems: "center",
              marginTop: hp("3.5%"),
            }}>
            <Pressable
              style={[
                {
                  backgroundColor: "#FFC72C",
                  paddingVertical: hp("2%"),
                  paddingHorizontal: wp("10%"),
                },
                windowWidth > 500 ? { borderRadius: 20 } : { borderRadius: 10 },
              ]}
              onPress={handleSubmit(handleSendConfirmation)}>
              <Text
                style={{
                  fontSize: RFPercentage(2.1),
                  fontFamily: "Inter-SemiBold",
                }}>
                Envoyer la confirmation
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Côté bas */}
        <View>
          {/* Lien vers la connexion */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: hp("4%"),
            }}>
            <Pressable
              style={[
                {
                  paddingVertical: hp("1%"),
                  paddingHorizontal: wp("5%"),
                  backgroundColor: "gray",
                },
                windowWidth > 500 ? { borderRadius: 14 } : { borderRadius: 7 },
              ]}
              onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: RFPercentage(2.4),
                  fontFamily: "Inter-Medium",
                  color: "white",
                }}>
                Page de connexion
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PasswordForgetScreen;

const styles = StyleSheet.create({});
