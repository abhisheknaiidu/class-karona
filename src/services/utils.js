import { firestore } from '../firebase';


export const createUserProfileDocument = async (userId, role) => {
    const userDocumentReference = firestore.collection('users').doc(userId);

    await userDocumentReference
        .set({
            role,
        }, { merge: true })


    return userDocumentReference

}