import firebase, { analytics, auth, firestore } from '../firebase';

const database = {};

database.getEnrolledCourseIds = (studentUserId) => {
  return new Promise((resolve, reject) => {
    const userDocumentReference = firestore.collection('users').doc(studentUserId);
    userDocumentReference
      .get()
      .then((userDoc) => {
          resolve(userDoc.courses);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

database.getCourseDetails = (courseId) => {
  const courseDocumentReference = firestore.collection('courses').doc(courseId);
  courseDocumentReference
    .get()
    .then((courseDoc) => {
      resolve(courseDoc);
    })
    .catch((reason) => {
      reject(reason);
    })
}

database.enrollStudentToCourse = (studentUserId, courseId) => {
  return new Promise((resolve, reject) => {
    database.getEnrolledCourseIds(studentUserId)
      .then((existingCourses) => {
        var newCourseList = existingCourses.push(courseId);
        const studentDoc = firestore.collection('users').doc(studentUserId);
        studentDoc.set({courses : newCourseList}, {merge: true})
          .then((response) => {
            resolve(response);
          })
          .catch((reason) => {
            reject(reason);
          })
      })
  })
};



export default database;