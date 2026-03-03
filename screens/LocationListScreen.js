import React, { useState, useEffect, useContext } from "react"
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { styles } from "../theme/theme.js"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { colours } from "../theme/colours.js"
import { useNavigation, useFocusEffect } from "@react-navigation/native"

const LocationListScreen = () => {
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchLocations = async () => {
    try {
      const userRef = collection(
        db,
        "locations",
        user.uid,
        "userLocations"
      )

      const snapshot = await getDocs(userRef)

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      setLocations(data)
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }
  // need to use this instead of normal useEffect for this to refresh correctly
  useFocusEffect(
    React.useCallback(() => {
      fetchLocations()
    }, [])
  )

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.rating}>Star Rating: {item.rating}</Text>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() =>
          navigation.navigate("Map", { locationName: item.name })
        }
      >
        <Text style={styles.mapButtonText}>View on Map</Text>
      </TouchableOpacity>
    </View>
  )

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No locations added yet.</Text>
        }
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("Add Location")}
      >
        <Text style={styles.addButtonText}>+ Add Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LocationListScreen;
