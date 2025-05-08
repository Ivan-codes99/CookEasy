import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import {login} from "../src/api/auth";

export default function LoginScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // for validation feedback

  const handleLogin = async () => {
    try {
      setMessage("logging in...");
      const res = await login(email, password);
      setMessage("user logged in");
      console.log("User logged in", res);
      router.push("./home"); // Redirect to home after successful login
    }
    catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>
      <Image source={require("../assets/images/logo.jpg")} style={{ width: 150, height: 150, borderRadius: 100 }} />
      <Text style={styles.message}>{message}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 50, paddingVertical: 50 },
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "lightcoral" },
  input: {
    backgroundColor: "#FFDAB9",
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    fontSize: 24
  },
  button: {
    backgroundColor: "lightcoral",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 20
  },
  buttonText: { fontSize: 24, color: "white", textAlign: "center"},
  message: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start"
  },
});
