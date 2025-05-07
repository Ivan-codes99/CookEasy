import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function RegisterScreen() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // for validation feedback

  const handleLogin = () => {
    // TODO Connect to API for credentials validation
    if (!email.includes("@")) {
      setMessage("Invalid email address");
    } else if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
    } else {
      setMessage("✔ Registered successfully!"); // or trigger API call here
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.message}>{message}</Text>
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 50, paddingVertical: 50 },
  title: { fontSize: 36, fontWeight: "bold", marginBottom: 20, color: "lightcoral" },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#ccc", marginBottom: 20 },
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
