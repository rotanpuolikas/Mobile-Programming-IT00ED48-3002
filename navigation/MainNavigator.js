import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { useContext } from "react"

import { TouchableOpacity, Text } from "react-native"

import { AuthContext } from "../context/AuthContext"

import LocationListScreen from "../screens/LocationListScreen"
import AddLocationScreen from "../screens/AddLocationScreen"
import MapScreen from "../screens/MapScreen"
import CountrySearchScreen from "../screens/CountrySearchScreen"

const Tab = createBottomTabNavigator()

// basic bottom navigation bar thingy

const MainNavigator = () => {

  const { logout, user } = useContext(AuthContext)
  
  return (
    <Tab.Navigator // this looks terrible but i found this to look the best
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 15 }}>
            <Text style={{ color: "#E63946", fontWeight: "600" }}>
              Logout
            </Text>
          </TouchableOpacity>), headerTitle: `Welcome ${user?.email}`,}}>
      <Tab.Screen name="Locations" component={LocationListScreen} />
      <Tab.Screen name="Add Location" component={AddLocationScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Countries" component={CountrySearchScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigator;
