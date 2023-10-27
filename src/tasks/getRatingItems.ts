import { collection, getDocs, query, limit } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export const getRatingItems = async (count: number) => {
  try {
    if(!auth.currentUser){
        return Promise.reject("Only logged in users can view rating items.");
    }

    const q = query(collection(db, "rating-items"), limit(count));

    const querySnapshot = await getDocs(q);

    const returnedRatingItems = new Map();
    querySnapshot.forEach((doc) => {
        returnedRatingItems.set(doc.id, doc.data());
    })

    return Promise.resolve(Object.fromEntries(returnedRatingItems));
  } catch (err) {
    return Promise.reject(err);
  }
};
