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

  /*******
  * GLOBALS
  ********/
  var results = {
    happy: 0,
    normal: 0,
    sad: 0
  };
  /*******
  * ELEMENTS
  *******/
  // Faces
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

  function handler(type, $e) {
    console.log(arguments);
    var updates = {};
    updates[type] = results[type]+=1;

    return firebase.database().ref().update(updates);
  }

  // Bind Handlers
  // .bind() allows you to specify arguments to be passed to functions when they are exectuted later. See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind for more
  $sadFace.on('click.sad', handler.bind(null, 'sad'));
  $normalFace.on('click.normal', handler.bind(null, 'normal'));
  $happyFace.on('click.happy', handler.bind(null, 'happy'));


  /********
  * Updating the UI
  ********/

  // Update each display
  function updateUI(values){
    $sadCounter.text(results.sad);
    $normalCounter.text(results.normal);
    $happyCounter.text(results.happy);
  }

  // handle new data
  firebase.database().ref().on('value', function(snapshot){
    var vals = snapshot.val();
    console.log('vals', vals);
    results = vals;
    updateUI();
  });

});
