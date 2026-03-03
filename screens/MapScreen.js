import React, { useEffect, useState } from "react"
import { styles } from "../theme/theme.js"
import { View, ActivityIndicator, Alert } from "react-native"
import { colours } from "../theme/colours.js"
import MapView, { Marker } from "react-native-maps"
import { useRoute, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DEFAULT_LOCATION = {
  name: "Oulu",
  latitude: 65.0124,
  longitude: 25.4682,
}

const MapScreen = () => {
  const route = useRoute()
  const locationName = route.params?.locationName // takes in params, best way i could think of to do this

  const [region, setRegion] = useState(null)

  const geocodeLocation = async (name) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${name}`
      )
      const data = await response.json()

      if (data.length === 0) {
        Alert.alert("Location not found")
        return
      }

      const { lat, lon } = data[0]

      const newRegion = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }

      setRegion(newRegion)

      await AsyncStorage.setItem(
        "lastLocation",
        JSON.stringify({ name, ...newRegion })
      )
    } catch (error) {
      console.log(error)
    }
  }

  const loadLastLocation = async () => {
    const stored = await AsyncStorage.getItem("lastLocation")

    if (stored) {
      const parsed = JSON.parse(stored);
      setRegion(parsed)
    } else {
      setRegion({
        latitude: DEFAULT_LOCATION.latitude,
        longitude: DEFAULT_LOCATION.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      })
    }
  }
 // this too has to use this to refresh properly, i don't get it but its fine i quess
  useFocusEffect(
    React.useCallback(() => {
      if (locationName) {
        geocodeLocation(locationName)
      } else {
        loadLastLocation()
      }
    }, [locationName])
  )

  if (!region) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    )
  }

  return (
    <MapView style={styles.map} region={region}>
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude,
        }}
        title={locationName || "Saved Location"}
      />
    </MapView>
  )
}

export default MapScreen;
