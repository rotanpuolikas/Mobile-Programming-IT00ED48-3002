import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase"

const addLocation = async () => {
  const userRef = collection(db, "locations", user.uid, "userLocations")

  await addDoc(userRef, {
    name, // it says 'name is deprecated' but it wont work correctly without
    description,
    rating,
  })
}
