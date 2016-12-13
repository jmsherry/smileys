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

  var $table = $('#score-table');

  function UpdateScoreTable(data) {
    console.log('in UpdateScoreTable', data);
    var $tableBody = $table.find('tbody');
    $tableBody.html('');
    if (!data || data.length === 0) {
      $tableBody.append('<tr><td colspan="4">No data to display</td></tr>');
      return;
    }

    var rowString = '';

    if (typeof data.forEach !== 'function'){
      $tableBody.append('<tr><td colspan="4" class="alert alert-danger">Error: Data in wrong format.</td></tr>');
      console.error('Data in wrong format');
      return;
    }

    data.forEach(function(match){
      // console.log(match);
      rowString += '<tr>';

      for (var team in match) {
        if( match.hasOwnProperty( team ) ) {
          // console.log(team, match[team]);
          rowString += '<td>' + team + '</td>';
          rowString += '<td>' + match[team] + '</td>';
        }
      }
      rowString += '</tr>';
    });

    $tableBody.append(rowString);

  }

  // Setup what happens when data changes
  firebase.database().ref('matches').on('value', function(snapshot) {
    // console.log('val', snapshot.val());
    var matches = snapshot.val();
    UpdateScoreTable(matches);
  });

  var $scoreForm = $('#score-form');
  var $team1Name = $('#name1');
  var $team2Name = $('#name2');
  var $team1Score = $('#score1');
  var $team2Score = $('#score2');
  var $inputs = $scoreForm.find('input');

  $scoreForm.on('submit', function(e) {
    // e.preventDefault();
  var newMatch = {};
  // console.log($team1Name, $team1Score);
  // console.log($team2Name, $team2Score);
  newMatch[$team1Name.val()] = $team1Score.val();
  newMatch[$team2Name.val()] = $team2Score.val();
  console.log('newMatch', newMatch);

   var newPostKey =
    firebase.database().ref().child('matches').push().key;

   console.log('newPostKey', newPostKey);

   var updates = {};
  updates['/matches/' + newPostKey] = newMatch;

  firebase.database().ref().update(updates);

  // reset form
  $inputs.val('');

  return false;
  });

});
