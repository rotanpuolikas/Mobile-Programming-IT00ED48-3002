import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import LocationListScreen from "../screens/LocationListScreen"
import AddLocationScreen from "../screens/AddLocationScreen"
import MapScreen from "../screens/MapScreen"
import CountrySearchScreen from "../screens/CountrySearchScreen"

const Tab = createBottomTabNavigator()

// basic bottom navigation bar thingy

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Locations" component={LocationListScreen} />
      <Tab.Screen name="Add Location" component={AddLocationScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Countries" component={CountrySearchScreen} />
    </Tab.Navigator>
  )
}

export default MainNavigator;
