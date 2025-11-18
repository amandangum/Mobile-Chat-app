import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView style={[styles.container, { paddingTop: 0 }]}>
        <View style={styles.contentWrapper}>
          <View>
            <Image
              source={require("../assets/images/woman3.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.mainText}>Let's Get Started</Text>
            <Text style={styles.subText}>
              Connect with each other by chatting or calling. Enjoy safe and
              private texting.
            </Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonTouch}
              onPress={() => router.push("/SignUpScreen")}
            >
              <Text style={styles.button}>Join Now</Text>
            </TouchableOpacity>

            <View style={styles.accountContainer}>
              <Text style={styles.accountText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push("/LoginScreen")}>
                <Text style={styles.accountOption}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#007bff",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  image: {
    width: 270,
    height: 270,
    alignSelf: "center",
    marginTop: 20,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 60
  },
  mainText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 48,
  },
  subText: {
    fontSize: 18,
    lineHeight: 24,
    marginTop: 10,
    color: "white",
  },
  buttonWrapper: {
    marginBottom: 25,
  },
  buttonTouch: {
    padding: 18,
    backgroundColor: "white",
    borderRadius: 12,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#007bff",
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  accountText: {
    color: "white",
    marginRight: 5,
    fontSize: 16,
  },
  accountOption: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});