function checkStatus() {
  if (user) {
    console.log(user)
    window.location = '/welcome';
  } else {
    window.location = '/login';
  }
}

function login() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  console.log(email);
  console.log(password);

  var cred = firebase.auth().signInWithEmailAndPassword(
    email,
    password
  ).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    console.error(errorCode);
    console.error(errorMessage);
  });

  console.log(cred);

  var user = firebase.auth().currentUser;

  if (user) {
    window.location = '/welcome';
  }

  return false;
}

function logout() {
  firebase.auth().signOut().catch(function(error) {
    console.error(error); 
  });

  window.location = '/login';
}

function getDisplayName() {
  var user = firebase.auth().currentUser;

  if (user) {
    return user.displayName;
  } else {
    return null;
  }
}

function getPhotoUrl() {
  var user = firebase.auth().currentUser;

  if (user) {
    return user.photoURL;
  } else {
    return null;
  }
}

function updatePhotoUrl(url) {
  var user = firebase.auth().currentUser;

  user.updateProfile({
    photoURL: url
  }).then(function() {
    // Update successful.
  }).catch(function(error) {
    // An error happened.
  });
}
