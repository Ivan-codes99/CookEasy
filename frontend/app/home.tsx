import {View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style = {styles.container}>
            <Text style = {styles.greeting}>Hello</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, alignItems: "center", backgroundColor: "white"},
    greeting: {color: "black"}
})