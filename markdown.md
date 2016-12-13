#Firebase Instructions

##Create
```
```

##Read
```
firebase.database().ref('matches').on('value', function(snapshot) {
  // console.log('val', snapshot.val());
  var matches = snapshot.val();
  UpdateScoreTable(matches);
});
```

##Update
```
```

##Delete
```
```
