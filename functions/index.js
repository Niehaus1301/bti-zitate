const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const settings = { timestampsInSnapshots: true};
db.settings(settings);

// Add data to database on user creation
exports.addUserData = functions.auth.user().onCreate((user) => {

  db.collection("users").doc(user.uid).set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      enabled: false
  })
  .then(function() {
      console.log("User " + user.email + " created!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });

  return 0;

});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
