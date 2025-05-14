import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { register } from "../src/api/auth";

export default function CookEasyScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    setMessage("");
    if (!email.includes("@")) {
      setMessage("Invalid email");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setMessage("Registering.....");
      const res = await register(name, email, password);
      setMessage("✔ Registered successfully!");
      console.log("User registered:", res);
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>
      <Image
        source={require("../assets/images/logo.jpg")}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>Whatcha Cookin?</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#7f4f4f"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7f4f4f"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7f4f4f"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe4e1",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#e36464",
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: "#a274d0",
    fontStyle: "italic",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFDAB9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 15,
    width: "100%",
    textAlign: "center",
    fontSize: 18,
    color: "#4d2c2c",
  },
  button: {
    backgroundColor: "lightcoral",
    padding: 16,
    borderRadius: 15,
    width: "100%",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  message: {
    fontSize: 14,
    color: "red",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
});
