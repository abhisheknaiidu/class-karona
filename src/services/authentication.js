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

authentication.signInWithAuthProvider = (providerId) => {
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
                .set({}, { merge: true })
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

export default authentication;