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

database.enrollUserToCourse = (userId, courseId) => {
  return new Promise((resolve, reject) => {
    database.getEnrolledCourseIds(userId)
      .then((existingCourses) => {
        var newCourseList = existingCourses.push(courseId);
        const userDoc = firestore.collection('users').doc(userId);
        userDoc.set({courses : newCourseList}, {merge: true})
          .then((response) => {
            resolve(response);
          })
          .catch((reason) => {
            reject(reason);
          })
      })
      .catch((reason) => {
        reject(reason);
      })
  })
  .catch((reason) => {
    reject(reason);
  })
};

database.createNewCourse = (courseName, courseDescription, courseCode, educatorId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('courses').add({
      courseCode: courseCode,
      courseName: courseName,
      courseDescription: courseDescription,
      educatorId: educatorId,
    })
    .then((courseId) => {
      database.enrollUserToCourse(educatorId, courseId)
        .then((response) => {
          resolve(response);
        })
        .catch((reason) => {
          reject(reason);
        })
    })
    .catch((reason) => {
      reject(reason);
    })
  })
}

database.createNewClass = (courseId, startTime, endTime) => {
  return new Promise((resolve, reject) => {
    firestore.collection('classes').add({
      courseId: courseId,
      startTime: firebase.firestore.Timestamp.fromDate(startTime),
      endTime: firebase.firestore.Timestamp.fromDate(endTime),
    })
    .then((docRef) => {
      resolve(docRef.id);
    })
    .catch((reason) => {
      reject(reason);
    })
  })
}

database.getUpcomingClassesForUser = (courseIdArray) => {
  return new Promise((resolve, reject) => {
    firestore.collection('classes')
      .where("courseId", "in", courseIdArray)
      .where("endTimestamp", ">=", firebase.firestore.Timestamp.fromDate(Date.now()))
      .get()
      .then((classes) => {
        resolve(classes);
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

database.getAllClassesForCourse = (courseId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('classes')
      .where("courseId", "==", courseId)
      .get()
      .then((classes) => {
        resolve(classes);
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

database.removeClass = (classId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('classes')
      .doc(classId)
      .delete()
      .then((classDoc) => {
        resolve(classDoc);
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

database.getClassDetails = (classId) => {
  return new Promise((resolve, reject) => {
    firestore.collection('classes')
      .doc(classId)
      .get()
      .then((classDoc) => {
        resolve(classDoc);
      })
      .catch((reason) => {
        reject(reason);
      })
  })
}

database.createEducatorInvite = (educatorEmailAddress) => {
  return new Promise((resolve, reject) => {
    firestore.collection('educatorInvites').add({
      email: educatorEmailAddress,
      timestamp: firebase.firestore.Timestamp.fromDate(Date.now())
    })
    .then((invite) => {
      resolve(invite.id);
    })
    .catch((reason) => {
      reject(reason);
    })
  })
}

export default database;