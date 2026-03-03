import Ionicons from "@expo/vector-icons/Ionicons"
import { View, Pressable } from "react-native"
import { styles } from "../theme/theme.js"
import { colours } from "../theme/colours.js"
import { useState } from "react"

export default function RatingStars({amount}){
  
    const maximum = 5

    return(
       <View style={styles.ratingStars}>
       {[...Array(maximum)].map((_, index) => {
         const filled = index < amount
         return(
           <Ionicons key={index} name={filled ? "star" : "star-outline"} size={22} color={colours.ratingStars} />
         )
       })}
       </View>
    )
}

export function RatingStarsClickable({ initVal = 0, onChange }){
  
  const maximum = 5
  const [rating, setRating] = useState(initVal)

  const handlePress = (value) => {
    setRating(value)
    if (onChange) {
      onChange(value) // returns value to parent
    }
  }

  return(
    <View style={styles.ratingStarsClickable}>
    {[...Array(maximum)].map((_, index) => {
      const value = index + 1
      const filled = value <= rating

      return(
        <Pressable key={index} onPress={() => handlePress(value)}>
          <Ionicons name={filled ? "star" : "star-outline"} size={32} color={colours.ratingStars} />
        </Pressable>
      )
    })}
    </View>
  )
  
}
