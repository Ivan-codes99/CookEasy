import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
export default function AuthScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>
      <Image source={require("../../assets/images/logo.jpg")} style={{ width: 150, height: 150, borderRadius: 100 }} />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push("/register")}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 50 },
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "lightcoral" },
  button: {
    backgroundColor: "lightcoral",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 20
  },
  buttonText: { fontSize: 24, color: "white", textAlign: "center"}
});
