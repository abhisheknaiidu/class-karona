import firebase, { analytics, auth, firestore } from '../firebase';

const authentication = {};

authentication.signIn = (emailAddress, password) => {
  return new Promise((resolve, reject) => {
    if (!emailAddress || !password) {
      reject();

      return;
    }

    if (auth.currentUser) {
      reject();

      return;
    }

    auth
      .signInWithEmailAndPassword(emailAddress, password)
      .then((value) => {
        const user = value.user;

        if (!user) {
          reject();

          return;
        }

        const uid = user.uid;

        if (!uid) {
          reject();

          return;
        }

        const userDocumentReference = firestore.collection('users').doc(uid);

        userDocumentReference
          .get({ source: 'server' })
          .then((value) => {
            if (value.exists) {
              analytics.logEvent('rest_login', {
                method: 'password',
              });

              resolve(user);
            } else {
              userDocumentReference
                .set({}, { merge: true })
                .then((value) => {
                  analytics.logEvent('rest_login', {
                    method: 'password',
                  });

                  resolve(user);
                })
                .catch((reason) => {
                  reject(reason);
                });
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

authentication.signInWithAuthProvider = (providerId, accessRole="student") => {
  return new Promise((resolve, reject) => {
    if (!providerId) {
      reject();

      return;
    }

    const provider = new firebase.auth.OAuthProvider(providerId);

    if (!provider) {
      reject();

      return;
    }

    if (auth.currentUser) {
      reject();

      return;
    }

    auth
      .signInWithPopup(provider)
      .then((value) => {
        const user = value.user;

        if (!user) {
          reject();

          return;
        }

        const uid = user.uid;

        if (!uid) {
          reject();

          return;
        }

        const userDocumentReference = firestore.collection('users').doc(uid);

        userDocumentReference
          .get({ source: 'server' })
          .then((value) => {
            if (value.exists) {
              analytics.logEvent('rest_login', {
                method: providerId,
              });

              resolve(user);
            } else {
              userDocumentReference
                .set({
                    role: accessRole,
                }, { merge: true })
                .then((value) => {
                  analytics.logEvent('rest_login', {
                    method: providerId,
                  });

                  resolve(user);
                })
                .catch((reason) => {
                  reject(reason);
                });
            }
          })
          .catch((reason) => {
            reject(reason);
          });
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

authentication.signOut = () => {
  return new Promise((resolve, reject) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      reject();

      return;
    }

    auth
      .signOut()
      .then((value) => {
        analytics.logEvent('rest_sign_out');

        resolve(value);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
};

authentication.signInWithEducatorInvite = (inviteCode, providerId) => {
  return new Promise((resolve, reject) => {
    const provider = new firebase.auth.OAuthProvider(providerId);
    if (!provider) {
      reject();
      return;
    }
    auth
      .signInWithPopup(provider)
      .then((value) => {
        const user = value.user;
        if (!user) {
          reject();
          return;
        }
        const uid = user.uid;
        const email = user.email;
        if (!uid || !email) {
          reject();
          return;
        }
        resolve(firestore.collection('educatorInvites').doc(inviteCode)
          .get()
          .then((inviteDoc) => {
            createTimestamp = inviteDoc.toDate().getTime();
            currTimeStamp = Date.now().getTime();
            if(currTimeStamp - createTimestamp <= 86400 * 1000 && !inviteDoc.redeemedAt) {
              firestore.collection('educatorInvites').doc(inviteCode)
                .set({redeemedAt: firebase.firestore.Timestamp.fromDate(Date.now())}, {merge: true})
                .then(
                  firestore.collection('users').doc(uid).set({role: 'educator'}, {merge: true})
                    .then({
                      resolve(user);
                    })
                    .catch((reason) => {
                      reject(reason);
                    })
                )
                .catch((reason) => {
                  reject(reason);
                })
            }
            else reject();
          })
          .catch((reason) => {
            reject(reason);
          }))
      })
  })
}

export default authentication;