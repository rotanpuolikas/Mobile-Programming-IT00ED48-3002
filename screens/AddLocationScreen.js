import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { AuthContext } from "../context/AuthContext"
import { RatingStarsClickable } from "../components/RatingStars.js"
import { styles } from '../theme/theme.js'

const AddLocationScreen = () => {
  const { user } = useContext(AuthContext)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [rating, setRating] = useState("")

  const handleAddLocation = async () => {
    if (!name || !description || !rating) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    if (rating < 1 || rating > 5) { // temporary, will be changed to clickable stars
      Alert.alert("Error", "Rating must be between 1 and 5")
      return
    }

    try {
      const userRef = collection(
        db,
        "locations",
        user.uid,
        "userLocations"
      )

      await addDoc(userRef, {
        name,
        description,
        rating: Number(rating),
        createdAt: serverTimestamp(),
      })

      Alert.alert("Success", "Location added!");

      setName("");
      setDescription("");
      setRating("");

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Could not save location");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Location</Text>

      <TextInput
        placeholder="Location name (e.g. New York)"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <View style={styles.ratingBox}>
      <Text>Rating</Text>
      <RatingStarsClickable onChange={(value) => setRating(value)} />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
        <Text style={styles.buttonText}>Save Location</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddLocationScreen
