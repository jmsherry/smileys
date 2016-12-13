#Firebase Instructions

##Create
```
// creating 'OK'
var updates = {};
updates['/ok/'] = 0;

return firebase.database().ref().update(updates);
```

##Read
```
firebase.database().ref().on('value', function(snapshot){
  var vals = snapshot.val();
  results = vals;
  updateUI();
});
```

##Update
```
var updates = {};
updates[type] = results[type]+=1;

return firebase.database().ref().update(updates);
```

##Delete
```
firebase.database().ref().child('ok').remove();
```
