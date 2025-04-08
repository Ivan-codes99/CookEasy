import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import {register} from "../src/api/auth";
export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // for validation feedback
//TODO text field validations, for name, password, email
const handleRegister = async () => {
  console.log("Register button clicked")
  // Basic client-side validation
  if (!email.includes("@")) {
    setMessage("Invalid email format");
    return;
  } else if (password.trim() === "") {
    setMessage("Password cannot be empty");
    return;
  } else if (name.trim() === "") {
    setMessage("Name cannot be empty");
    return;
  }

  try {
    // Call the register function and handle the response
    const response = await register(name, email, password);
    setMessage("✔ Registered successfully!"); // Success message
  } catch (error: any) {
    setMessage(error.message); // Display error message from the API
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

       {/* Error message displayed at the bottom */}
       {message && <Text style={styles.errorText}>{message}</Text>}
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
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginTop: 20,
    textAlign: "center"
  }
});
