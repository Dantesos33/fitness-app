import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image
        style={{ height: "100%", width: "100%", position: "absolute" }}
        source={require("../assets/images/welcome.png")}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(70), display: "flex", justifyContent: "flex-end", paddingBottom: 50, marginVertical: "28px" }}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 0.8}}
      >
        <View style={{display: "flex", alignItems: "center"}}>
          <Text style={{ color: "white", fontSize: hp(5), fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>
            Welcome to <Text style={{color: "rgb(244, 63, 94)"}}>FitTrack</Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity onPress={() => router.push("exercise")} style={{height: hp(7), width: wp(80), backgroundColor: "rgb(244, 63, 94)", borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center", borderWidth: 2, borderColor: "white"}}>
            <Text style={{color: "white", fontWeight: "bold", fontSize: hp(3)}}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ghostwhite",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
