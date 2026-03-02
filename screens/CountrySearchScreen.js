import { View, Text, StyleSheet } from "react-native"

const CountrySearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Country Search Screen</Text>
    </View>
  )
}

export default CountrySearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1FAEE",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    color: "#1D3557",
  },
})
