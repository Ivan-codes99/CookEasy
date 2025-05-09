import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchUserData } from "../src/api/auth";

export default function HomeScreen() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserData();
        setName(user.name);
      } catch (err) {
        console.log("Failed to load user", err);
      }
    };

    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello {name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
  greeting: { color: "black", fontSize: 24 }
});
