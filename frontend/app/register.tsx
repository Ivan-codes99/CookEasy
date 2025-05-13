import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { register } from "../src/api/auth";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // for validation feedback

  const handleRegister = async () => {
    setMessage(""); // Clear old messages
    // Basic validation
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

      // Optionally redirect to login screen:
      // router.push("/login");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  //TODO text field validations, for name, password, email
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>
      <Image source={require("../assets/images/logo.jpg")} style={{ width: 150, height: 150, borderRadius: 100 }} />
      <Text style={styles.message}>{message}</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", padding: 50 },
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
    marginTop: 20,
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
