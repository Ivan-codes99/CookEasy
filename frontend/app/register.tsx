import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // for validation feedback

  const handleRegister = () => {
    // Placeholder validation (replace with real logic later)
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
        <Text style={styles.buttonText}>register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#ccc", marginBottom: 20 },
  input: {
    backgroundColor: "#ddd",
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    width: "100%",
    textAlign: "center"
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: "flex-end",
    paddingHorizontal: 20
  },
  buttonText: { fontSize: 14 },
  message: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start"
  }
});
