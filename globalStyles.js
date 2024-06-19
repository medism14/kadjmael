import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  screenStyle: {
    paddingTop: hp("2%"),
    paddingHorizontal: wp("8%"),
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  outConnexionPressable: {
    flexDirection: "row",
    gap: 2,
    paddingVertical: hp("2%"),
    paddingHorizontal: wp("5%"),
    backgroundColor: "#308DAD",
    alignItems: "center",
    width: wp("70%"),
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    paddingHorizontal: wp("3%"),
    marginTop: hp("4%"),
  },
  inputContent: {
    color: "black",
    fontSize: RFPercentage(2),
    flex: 1,
    fontFamily: "Inter-SemiBold",
  },
});
