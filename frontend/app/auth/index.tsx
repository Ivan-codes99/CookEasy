import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter

const CookEasyWelcomeScreen = () => {
  const router = useRouter(); // Initialize the router

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CookEasy</Text>

      <View style={styles.logoWrapper}>
        <Image
          source={require('../../assets/images/logo.jpg')} // Replace with your actual image path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.subtitle}>Whatcha Cookin?</Text>

      <TouchableOpacity 
        style={styles.loginButton}
        onPress={() => router.push('/login')} // Navigate to the login page
        >
        <Text style={styles.loginText}>🍴 Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => router.push('/register')} // Navigate to the register page
      >
        <Text style={styles.registerText}>🍓 Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE5E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#EF5C5C',
    marginBottom: 20,
  },
  logoWrapper: {
    backgroundColor: '#FFF0D6',
    borderRadius: 100,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  logo: {
    width: 120,
    height: 120,
  },
  subtitle: {
    fontSize: 24,
    fontStyle: 'italic',
    color: '#9066C2',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#F8766A',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  loginText: {
    color: '#FFF5EC',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#F8766A',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 20,
  },
  registerText: {
    color: '#FFF5EC',
    fontSize: 18,
  },
});

export default CookEasyWelcomeScreen;