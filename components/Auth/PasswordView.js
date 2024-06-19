import { StyleSheet, Text, View } from "react-native";
import React from "react";

const PasswordView = ({  }) => {

  return (
    <Pressable
      onPress={() => setPasswordConfirmationSecure(!passwordConfirmationSecure)}
      style={[
        { height: hp("6.5%"), justifyContent: "center" },
        windowWidth > 500
          ? { paddingHorizontal: 20 }
          : { paddingHorizontal: 10, backgroundColor: "red" },
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
  );
};

export default PasswordView;

const styles = StyleSheet.create({});
