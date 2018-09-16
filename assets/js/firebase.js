// Initialize Firebase
var config = {
  apiKey: "AIzaSyD1c5BF0B6KnlvrmoSRxG9Ryl0Vkw38Cso",
  authDomain: "studi-10484.firebaseapp.com",
  databaseURL: "https://studi-10484.firebaseio.com",
  projectId: "studi-10484",
  storageBucket: "studi-10484.appspot.com",
  messagingSenderId: "261711427681"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user)
    window.location = '/';
    // User is signed in.
  } else {
    window.location = '/';
    // No user is signed in.
  }
});