import { colours } from "./colours.js"

import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colours.textPrimary,
    marginBottom: 20,
  },
  input: {
    backgroundColor: colours.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#A8DADC",
  },
  button: {
    backgroundColor: colours.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: colours.card,
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colours.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  flag: {
    width: 50,
    height: 30,
    marginRight: 15,
  },
  countryName: {
    fontSize: 16,
    color: colours.textPrimary,
  },
  error: {
    color: colours.error,
    marginBottom: 10,
  },
})
