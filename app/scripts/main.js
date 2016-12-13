$(function() {
  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyDUCwn8c9JzMRJDugyYWZw7a2Niw4P6sTQ',
    authDomain: 'fir-ac2be.firebaseapp.com',
    databaseURL: 'https://fir-ac2be.firebaseio.com',
    storageBucket: 'fir-ac2be.appspot.com',
    messagingSenderId: '524415635353'
  };

  // 'firebase' is the global created by loading the script
  firebase.initializeApp(config);



  /*************
  * APPLICATION STATE
  *************/
var appState = {
  connected: false,
  results: {
      happy: 0,
      normal: 0,
      sad: 0
    }
}

 /***********
 * Helper Functions
 ***********/
 function handleConnection(state) {
   disableButtons(state);
   displayMessages(state);
 }

  /*******
  * ELEMENTS
  *******/
  // Messages
  var $messages = $('.messages');
  var $connectionWarning = $('.connectionWarning');

  // Faces
  var $faces = $('.emotion');
  var $sadFace = $('.sad');
  var $normalFace = $('.normal');
  var $happyFace = $('.happy');

  // Counters
  var $sadCounter = $('.sad-counter');
  var $normalCounter = $('.normal-counter');
  var $happyCounter = $('.happy-counter');

  /*******
  * HANDLERS
  *******/

  function updateScores(type, $e) {
    console.log(arguments);
    var updates = {};
    updates[type] = appState.results[type]+=1;
    firebase.database().ref().update(updates);
  }

  // Bind Handlers
  // .bind() allows you to specify arguments to be passed to functions when they are exectuted later. See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind for more
  $sadFace.on('click.sad', updateScores.bind(null, 'sad'));
  $normalFace.on('click.normal', updateScores.bind(null, 'normal'));
  $happyFace.on('click.happy', updateScores.bind(null, 'happy'));


  /********
  * Updating the UI
  ********/

  // Update each display
  function updateUI(values){
    $sadCounter.text(appState.results.sad);
    $normalCounter.text(appState.results.normal);
    $happyCounter.text(appState.results.happy);
  }

  // Display UI Messages
  function displayMessages(type) {
    switch(type) {
      case 'disconnected':
      $connectionWarning.show();
      break;
      case 'connected':
      $connectionWarning.hide();
      break;
    }
  }

  // Enable/Disable Buttons
  function disableButtons(val) {
    switch(val){
      case 'disconnected':
      $faces.prop('disabled', 'disabled');
      break;
      case 'connected':
      $faces.prop('disabled', '');
      break;
    }
  }

  // handle new data
  firebase.database().ref().on('value', function(snapshot){
    var vals = snapshot.val();
    console.log('vals', vals);
    appState.results = vals;
    localStorage.setItem('appState', appState);
    localStorage.setItem
    updateUI();
  });

  // Deal with disconnection
  var connectedRef = firebase.database().ref('.info/connected');
  connectedRef.on('value', function(snap) {
    if (snap.val() === true) {
      handleConnection('connected');
    } else {
      handleConnection('disconnected');
    }
  });

});
