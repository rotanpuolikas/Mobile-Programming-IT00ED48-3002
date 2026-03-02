import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, ActivityIndicator } from "react-native"

import { styles } from "../theme/theme.js"
import { colours } from "../theme/colours.js"

const CountrySearchScreen = () => {
  const [keyword, setKeyword] = useState("")
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const searchCountries = async () => {
    if (!keyword) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${keyword}`
      )

      if (!response.ok) {
        throw new Error("No countries found")
      }

      const data = await response.json()
      setCountries(data)
    } catch (err) {
      setCountries([])
      setError("No countries found")
    }

    setLoading(false)
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.flags.png }} style={styles.flag} />
      <Text style={styles.countryName}>
        {item.name.common}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Countries</Text>

      <TextInput
        placeholder="Enter country name"
        value={keyword}
        onChangeText={setKeyword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={searchCountries}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color={colours.primary} />}

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
      />
    </View>
  )
}

export default CountrySearchScreen;
