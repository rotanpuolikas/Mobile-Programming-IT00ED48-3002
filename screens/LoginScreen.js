import { useState, useContext } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AuthContext } from "../context/AuthContext"
import { styles } from "../theme/theme.js"
import { colours } from "../theme/colours.js"

const LoginScreen = () => {
  const { login } = useContext(AuthContext)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setError("")
    setLoading(true)

    try {
      await login(email, password);
    }
    catch (err) {
      setError("Invalid email or password")
    }

    setLoading(false)
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor={colours.textSecondary}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        inputMode="email"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={colours.textSecondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color={colours.whiteText} />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default LoginScreen
